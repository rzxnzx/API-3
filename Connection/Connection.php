<?php

namespace Connection;

use PDO;
use PDOException;
use Enviroment\Env;

class Connection
{
    private static ?Connection $instance = null;
    private PDO $db;

    private function __construct()
    {
        $this->setupDatabaseConnection();
    }

    private function setupDatabaseConnection()
    {
        $env = Env::getInstance();
        $host = $env->get('DB_HOST', 'localhost');
        $dbname = $env->get('DB_NAME');
        $username = $env->get('DB_USERNAME');
        $password = $env->get('DB_PASSWORD');

        $dsn = "mysql:host={$host};dbname={$dbname}";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->db = new PDO($dsn, $username, $password, $options);
            $this->db->exec("SET CHARACTER SET utf8");
        } catch (PDOException $e) {
            throw new \RuntimeException("Error connecting to the database: " . $e->getMessage());
        }
    }

    public static function getInstance(): Connection
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getDatabase(): PDO
    {
        return $this->db;
    }
}
