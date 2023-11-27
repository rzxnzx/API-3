<?php
require_once(dirname(__FILE__). "./Helpers/autoload.php");
use Router\Routes;
use Router\Router;
use Request\RequestManager;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


$routes = new Routes();
$http = $_SERVER['REQUEST_METHOD'];
list($Controller, $Action, $Identificator) = Router::route();

RequestManager::Request($http, $routes->getRoutes(), $Controller, $Action, $Identificator);
