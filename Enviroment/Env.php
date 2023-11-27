<?php

namespace Enviroment;

class Env
{
    private static ?Env $instance = null;
    private array $envData;

    private function __construct()
    {
        $this->loadEnv();
    }

    public static function getInstance(): Env
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function get(string $key, $default = null)
    {
        return $this->envData[$key] ?? $default;
    }

    public function getAll(): array
    {
        return $this->envData;
    }

    private function loadEnv()
    {
        $envFile = __DIR__ . '/../.env'; 

        if (!file_exists($envFile)) {
            throw new \RuntimeException("El archivo .env no se encuentra.");
        }

        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lines as $line) {
            if (strpos($line, '#') !== false || strpos($line, '=') === false) {
                continue;
            }

            list($key, $value) = explode('=', $line, 2);
            $this->envData[trim($key)] = trim($value);
        }
    }
}
