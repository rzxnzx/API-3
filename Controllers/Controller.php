<?php

namespace Controllers;

use Build\JsonBuild;

class Controller
{
    public function Return($code, $message, $data, $status)
    {
        $response = new JsonBuild();
        $response->setJSON($code, $message, $data, $status);
        $response->sendJSONReturn();
    }
}