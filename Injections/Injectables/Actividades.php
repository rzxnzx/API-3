<?php

namespace Injections\Injectables;
use Connection\Connection;
use Injections\Injectable;

class Actividades extends Injectable {
    public function __construct(Connection $connection) {
        parent::__construct($connection, 'actividades');
    }

    public function create(array $activityData)
    {
        $query = $this->Database->prepare("INSERT INTO $this->table (unidad_id, titulo, descripcion, actividadescol) VALUES (:unidad_id, :titulo, :descripcion, :actividadescol)");
        $query->bindParam(':unidad_id', $activityData['unidad_id']);
        $query->bindParam(':titulo', $activityData['titulo']);
        $query->bindParam(':descripcion', $activityData['descripcion']);
        $query->bindParam(':actividadescol', $activityData['actividadescol']);
        $query->execute();
        $insertedActivityId = $this->Database->lastInsertId();
        $insertedActivtyData = $this->ObtenerUno($insertedActivityId);

        return $insertedActivtyData;
    }

    public function update($id, array $activityData)
    {
        $validFields = ['unidad_id', 'titulo', 'descripcion', 'actividadescol'];
        $updateData = [];

        foreach ($activityData as $key => $value) {
            if (in_array($key, $validFields)) {
                $updateData[$key] = $value;
            }
        }

        if (empty($updateData)) {
            return json_encode(["message" => 'No se proporcionaron datos válidos para actualizar.']);
            
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