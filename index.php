<?php
require_once(dirname(__FILE__). "./Helpers/autoload.php");
use Router\Routes;
use Router\Router;
use Request\RequestManager;

$routes = new Routes();
$http = $_SERVER['REQUEST_METHOD'];
list($Controller, $Action, $Identificator) = Router::route();

RequestManager::Request($http, $routes->getRoutes(), $Controller, $Action, $Identificator);
