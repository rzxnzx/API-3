<?php

namespace Injections\Injectables;
use Connection\Connection;
use Injections\Injectable;

class Usuarios extends Injectable {
    public function __construct(Connection $connection) {
        parent::__construct($connection, 'usuarios');
    }

    public function create(array $userData)
    {
        $password = password_hash($userData['password'], PASSWORD_BCRYPT);
        $query = $this->Database->prepare("INSERT INTO $this->table (nombres, apellidos, email, identificacion, fecha_nacimiento, username, password, celular) VALUES (:nombres, :apellidos, :email, :identificacion, :fecha_nacimiento, :username, :password, :celular)");
        $query->bindParam(':nombres', $userData['nombres']);
        $query->bindParam(':apellidos', $userData['apellidos']);
        $query->bindParam(':email', $userData['email']);
        $query->bindParam(':identificacion', $userData['identificacion']);
        $query->bindParam(':fecha_nacimiento', $userData['fecha_nacimiento']);
        $query->bindParam(':username', $userData['username']);
        $query->bindParam(':password', $password);
        $query->bindParam(':celular', $userData['celular']);
        $query->execute();
        $insertedUserId = $this->Database->lastInsertId();
        $insertedUserData = $this->ObtenerUno($insertedUserId);

        return $insertedUserData;
    }

    public function update($id, array $userData)
    {
        $validFields = ['nombres', 'apellidos', 'email', 'identificacion', 'fecha_nacimiento', 'username', 'password', 'celular'];
        $updateData = [];

        foreach ($userData as $key => $value) {
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
        foreach ($bindValues as $key => &$val) {
            $query->bindParam($key, $val);
        }

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

}