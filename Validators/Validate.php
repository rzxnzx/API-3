<?php

namespace Validators;

use DateTime;

class Validate
{

    public static function Validate($data, $rules, $modo = 'crear')
    {
        $errors = [];
        $expectedKeys = array_keys($rules);

        foreach ($expectedKeys as $key) {
            $isRequired = ($modo === 'crear') ? in_array('Required', $rules[$key]) : false;

            if ($isRequired && !array_key_exists($key, $data)) {
                $errors[] = ["$key" => "La clave $key no está presente en el array de datos"];
            }
        }

        if (!empty($errors)) {
            return $errors;
        }

        foreach ($rules as $campo => $validators) {
            $isRequired = ($modo === 'crear') ? in_array('Required', $validators) : false;

            if (!$isRequired && !isset($data[$campo])) {
                continue;
            }

            foreach ($validators as $validator) {
                $error = self::validateField($data[$campo], $campo, $validator);

                if ($error) {
                    $errors = array_merge($errors, $error);
                }
            }
        }

        if ($modo === 'actualizar' && empty(array_filter($data))) {
            $errors[] = ["general" => "Al menos un campo debe ser proporcionado para la actualización"];
        }

        return $errors;
    }

    public static function validateField($value, $campo, $validator)
    {
        $validations = [
            'String' => function ($value, $campo) {
                if (!is_string($value)) {
                    return ["$campo" => "El valor de $campo no es una cadena"];
                }
                return null;
            },
            'Number' => function ($value, $campo) {
                if (!is_numeric($value)) {
                    return ["$campo" => "El valor de $campo no es numérico"];
                }
                return null;
            },
            'Email' => function ($value, $campo) {
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    return ["$campo" => "El campo $campo no tiene formato de correo electrónico"];
                }
                return null;
            },
            'Date' => function ($value, $campo) {
                $date = DateTime::createFromFormat('Y-m-d', $value);
                if (!$date || $date->format('Y-m-d') !== $value) {
                    return ["$campo" => "El campo $campo no tiene el formato AAA-MM-DD"];
                }
                return null;
            },
            'Boolean' => function ($value, $campo) {
                if (!is_bool($value)) {
                    return ["$campo" => "El valor de $campo no es booleano"];
                }
                return null;
            },
            'Hour' => function ($value, $campo) {
                $pattern = '/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/';
                if (!preg_match($pattern, $value)) {
                    return ["$campo" => "El campo $campo no tiene el formato de hora HH:MM"];
                }
                return null;
            },
            'Required' => function ($value, $campo) {
                if (empty($value)) {
                    return ["$campo" => "El campo $campo es obligatorio y no puede estar vacío"];
                }
                return null;
            },
        ];

        if (array_key_exists($validator, $validations)) {
            return $validations[$validator]($value, $campo);
        } else {
            return ["$campo" => "Validador desconocido: $validator"];
        }
    }
}
