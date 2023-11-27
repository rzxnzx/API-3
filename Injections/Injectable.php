<?php

namespace Injections;
use Build\Relations\RelationLoader;
use Connection\Connection;
use Build\Relations\Relations;
use PDO;

class Injectable extends RelationLoader
{
    protected $Database;
    protected $table;

    public function __construct(Connection $Database, $table)
    {
        parent::__construct($Database);
        $this->Database = $Database->getDatabase();
        $this->table = $table;
        $this->setRelations(Relations::Relations);
    }

    public function ObtenerTodos()
    {
        $query = $this->Database->prepare("SELECT * FROM $this->table");
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($results as &$result) {
            $this->loadRelations($this->table, $result);
        }

        return $results;
    }

    public function ObtenerUno($id)
    {
        $query = $this->Database->prepare("SELECT * FROM $this->table WHERE id = :id");
        $query->bindParam(':id', $id);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

        $this->loadRelations($this->table, $result);

        return $result;
    }

    public function Eliminar($id) {
        $query = $this->Database->prepare("DELETE FROM $this->table WHERE id = :id");
        $query->bindParam(':id', $id);
        $query->execute();
        $user = $this->ObtenerUno($id); 
        return $user;
    }
}