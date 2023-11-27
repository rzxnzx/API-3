<?php

namespace Request;

class RequestManager {
    public static function Request($method, $rutas, $controllerName, $action, $id) {
        if (isset($rutas[$controllerName]) && isset($rutas[$controllerName][$action])) {
            $routeData = $rutas[$controllerName][$action];
            $allowedMethod = $routeData[0];
            $controllerData = $routeData[1];

            if ($method === $allowedMethod) {
                $controller = new $controllerData[0]($controllerData[2]);

                switch ($method) {
                    case 'GET':
                        $controller->{$controllerData[1]}($id);
                        break;
                    case 'POST':
                        $input = json_decode(file_get_contents('php://input'), true);
                        $controller->{$controllerData[1]}($input);
                        break;
                    case 'PUT':
                        $input = json_decode(file_get_contents('php://input'), true);
                        $controller->{$controllerData[1]}($id, $input);
                        break;
                    case 'DELETE':
                        $controller->{$controllerData[1]}($id);
                        break;
                    default:
                        http_response_code(405);
                        echo json_encode(["message" => "Método no permitido"]);
                        break;
                }
            } else {
                http_response_code(405);
                echo json_encode(["message" => "Método no permitido para esta acción"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Ruta o acción no encontrada"]);
        }
    }
}