<?php

namespace Router;

use Connection\Connection;
use Controllers\BaseControllers\ActividadesController;
use Controllers\BaseControllers\CursosController;
use Controllers\BaseControllers\UnidadesController;
use Controllers\BaseControllers\UsuariosController;
use Injections\Injectables\Actividades;
use Injections\Injectables\Cursos;
use Injections\Injectables\Unidades;
use Injections\Injectables\Usuarios;

class Routes {
    private $database;

    public function __construct() {
        $this->database = Connection::getInstance();
    }

    public function getRoutes() {
        $CursoInjection = new Cursos($this->database);
        $UsuarioInjection = new Usuarios($this->database);
        $UnidadesInjection = new Unidades($this->database);
        $ActividadesInjection = new Actividades($this->database);

        return [
            'cursos' => [
                'listar' => ['GET', [CursosController::class, 'listar', $CursoInjection]],
                'obtener' => ['GET', [CursosController::class, 'obtener', $CursoInjection]],
                'crear' => ['POST', [CursosController::class, 'crear', $CursoInjection]],
                'actualizar' => ['PUT', [CursosController::class, 'actualizar', $CursoInjection]],
                'eliminar' => ['DELETE', [CursosController::class, 'eliminar', $CursoInjection]],
            ],
            'usuarios' => [
                'listar' => ['GET', [UsuariosController::class, 'listar', $UsuarioInjection]],
                'obtener' => ['GET', [UsuariosController::class, 'obtener', $UsuarioInjection]],
                'crear' => ['POST', [UsuariosController::class, 'crear', $UsuarioInjection]],
                'actualizar' => ['PUT', [UsuariosController::class, 'actualizar', $UsuarioInjection]],
                'eliminar' => ['DELETE', [UsuariosController::class, 'eliminar', $UsuarioInjection]],
            ],
            'unidades' => [
                'listar' => ['GET', [UnidadesController::class, 'listar', $UnidadesInjection]],
                'obtener' => ['GET', [UnidadesController::class, 'obtener', $UnidadesInjection]],
                'crear' => ['POST', [UnidadesController::class, 'crear', $UnidadesInjection]],
                'actualizar' => ['PUT', [UnidadesController::class, 'actualizar', $UnidadesInjection]],
                'eliminar' => ['DELETE', [UnidadesController::class, 'eliminar', $UnidadesInjection]],
            ],
            'actividades' => [
                'listar' => ['GET', [ActividadesController::class, 'listar', $ActividadesInjection]],
                'obtener' => ['GET', [ActividadesController::class, 'obtener', $ActividadesInjection]],
                'crear' => ['POST', [ActividadesController::class, 'crear', $ActividadesInjection]],
                'actualizar' => ['PUT', [ActividadesController::class, 'actualizar', $ActividadesInjection]],
                'eliminar' => ['DELETE', [ActividadesController::class, 'eliminar', $ActividadesInjection]],
            ],
        ];
    }
}
