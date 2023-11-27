<?php

namespace Build;

class JsonBuild {
    protected $JsonResponse;

    public function setJSON($code, $message, $data, $status) {
        $this->JsonResponse = [
          'code' => $code,
          'message' => $message,
          'data' => $data,
          'status' => $status  
        ];
    }

    public function sendJSONReturn(){
        header('Content-Type: application/json');
        http_response_code($this->JsonResponse['code']);
        echo json_encode($this->JsonResponse);
    }
}