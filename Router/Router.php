<?php

namespace Router;

class Router {
    public static function route() {
        $url = $_SERVER['REQUEST_URI'];
        $url = trim($url, '/');
        $urlParts = explode('/', $url);

        $controllerName = $urlParts[0] ?? null;
        $action = $urlParts[1] ?? null;
        $id = $urlParts[2] ?? null;

        return [$controllerName, $action, $id];
    }
}
