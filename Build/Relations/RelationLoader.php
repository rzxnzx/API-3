<?php

namespace Build\Relations;

use Connection\Connection;
use PDO;

class RelationLoader
{
    protected $Database;
    protected $relations = [];

    public function __construct(Connection $Database)
    {
        $this->Database = $Database->getDatabase();
    }

    public function loadRelations($table, &$result)
    {
        if (array_key_exists($table, $this->relations)) {
            foreach ($this->relations[$table] as $relatedTable => $relation) {
                $foreign_key = $relation['foreign_key'];
                $related_table = $relation['table'];
                $query = $this->Database->prepare("SELECT * FROM $related_table WHERE id = :id");
                $query->bindParam(':id', $result[$foreign_key]);
                $query->execute();
                $Data = $query->fetch(PDO::FETCH_ASSOC);
                $result[$relatedTable] = $Data;
            }
        }
    }

    public function setRelations($relations)
    {
        $this->relations = $relations;
    }
}