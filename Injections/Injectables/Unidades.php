<?php

namespace Injections\Injectables;

use Connection\Connection;
use Injections\Injectable;

class Unidades extends Injectable
{
    public function __construct(Connection $connection)
    {
        parent::__construct($connection, 'unidades');
    }

    public function create(array $unidadData)
    {
        $query = $this->Database->prepare("INSERT INTO $this->table (cursos_id, usuario_id, nombre, introduccion, fecha_creacion, hora_creacion, activa) 
                                    VALUES (:cursos_id, :usuario_id, :nombre, :introduccion, :fecha_creacion, :hora_creacion, :activa)");
        $query->bindParam(':cursos_id', $unidadData['cursos_id']);
        $query->bindParam(':usuario_id', $unidadData['usuario_id']);
        $query->bindParam(':nombre', $unidadData['nombre']);
        $query->bindParam(':introduccion', $unidadData['introduccion']);
        $query->bindParam(':fecha_creacion', $unidadData['fecha_creacion']);
        $query->bindParam(':hora_creacion', $unidadData['hora_creacion']);
        $query->bindParam(':activa', $unidadData['activa']);

        $query->execute();
        $insertedUnidadId = $this->Database->lastInsertId();
        $insertedUnidadData = $this->ObtenerUno($insertedUnidadId);

        return $insertedUnidadData;
    }

    public function update($id, array $unidadData)
    {
        $validFields = ['cursos_id', 'usuario_id', 'nombre', 'introduccion', 'fecha_creacion', 'hora_creacion', 'activa'];
        $updateData = [];

        foreach ($unidadData as $key => $value) {
            if (in_array($key, $validFields)) {
                $updateData[$key] = $value;
            }
        }

        if (empty($updateData)) {
            echo json_encode(["message" => 'No se proporcionaron datos válidos para actualizar.']);
            return false;
        }

        $updateFields = [];
        $bindValues = [];

        foreach ($updateData as $key => $value) {
            $updateFields[] = "$key = :$key";
            $bindValues[":$key"] = $value;
        }

        $updateFieldsString = implode(', ', $updateFields);
        $query = $this->Database->prepare("UPDATE $this->table SET $updateFieldsString WHERE id = :id");

        $bindValues[':id'] = $id;
        foreach ($bindValues as $key => $value) {
            $query->bindValue($key, $value);
        }

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

}