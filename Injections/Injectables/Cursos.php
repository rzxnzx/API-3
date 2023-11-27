<?php

namespace Injections\Injectables;

use Connection\Connection;
use Injections\Injectable;

class Cursos extends Injectable
{
    public function __construct(Connection $connection)
    {
        parent::__construct($connection, 'cursos');
    }

    public function create(array $cursoData)
    {
        $query = $this->Database->prepare("INSERT INTO $this->table (nombre, creditos) VALUES (:nombre, :creditos)");
        $query->bindParam(':nombre', $cursoData['nombre']);
        $query->bindParam(':creditos', $cursoData['creditos']);
        $query->execute();
        $insertedCursoId = $this->Database->lastInsertId();
        $insertedCurso = $this->ObtenerUno($insertedCursoId);
        return $insertedCurso;
    }

    public function update($id, array $cursoData)
    {
        $Fields = ['nombre', 'creditos'];
        $Data = [];
        foreach ($cursoData as $key => $value) {
            if (in_array($key, $Fields)) {
                $Data[$key] = $value;
            }
        }
        if (empty($Data)) {
            echo json_encode(["message" => 'No se proporcionaron datos válidos para actualizar.']);
            return false;
        }
        $updateFields = [];
        $bindValues = [];
        foreach ($Data as $key => $value) {
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