<?php

namespace Controllers\BaseControllers;

use Controllers\Controller;
use Injections\Injectables\Cursos;
use Models\CursosModel;
use Build\Responses\CursosMessage;
use Validators\Validate;
use Rules\Crear\CursosRules;
use Rules\Actualizar\CursosUpdateRules;

class CursosController extends Controller
{
    private $CursoInjection;

    public function __construct(Cursos $Injection)
    {
        $this->CursoInjection = $Injection;
    }

    public function obtener($id) {
        $usuario = $this->CursoInjection->ObtenerUno($id);
        if ($usuario) {
            $this->Return(200, CursosMessage::GET_OK, $usuario, CursosModel::GET_ALL_OK);
        } else {
            $this->Return(404, CursosMessage::GET_ERROR, null, CursosModel::GET_ERROR);
        }
    }

    public function listar()
    {
        return $this->Return(200, CursosMessage::GET_OK_ALL, $this->CursoInjection->ObtenerTodos(), CursosModel::GET_ALL_OK);
    }

    public function crear(array $data)
    {
        $errors = Validate::Validate($data, CursosRules::Rules, 'crear');

        if (!empty($errors)) {
            return $this->Return(301, CursosMessage::INSERT_ERROR, $errors, CursosModel::INSERT_ERROR);
        }

        $result = $this->CursoInjection->create($data);
        $this->Return(200, CursosMessage::INSERT_OK, $result, CursosModel::INSERT_OK);
    }

    public function actualizar($id, array $data)
    {
        $curso = $this->CursoInjection->ObtenerUno($id);

        if (!$curso) {
            $this->Return(404, CursosMessage::GET_ERROR, [], CursosModel::CURSO_ERROR);
        } else {
            $errors = Validate::Validate($data, CursosUpdateRules::Rules, 'actualizar');

            if (!empty($errors)) {
                return $this->Return(301, CursosMessage::INSERT_ERROR, $errors, CursosModel::INSERT_ERROR);
            }

            $Result = $this->CursoInjection->update($id, $data);

            if ($Result) {
                $updated = $this->CursoInjection->ObtenerUno($id);
                $this->Return(200, CursosMessage::UPDATE_OK, $updated, CursosModel::UPDATE_OK);
            } else {
                $this->Return(500, CursosMessage::UPDATE_ERROR, [], CursosModel::UPDATE_ERROR);
            }
        }
    }

    public function eliminar($id)
    {
        $curso = $this->CursoInjection->ObtenerUno($id);

        if (!$curso) {
            $this->Return(404, CursosMessage::GET_ERROR, [], CursosModel::CURSO_ERROR);
        } else {
            $curso = $this->CursoInjection->Eliminar($id);

            if ($curso !== null) {
                $this->Return(200, CursosMessage::DELETE, [], CursosModel::DELETE_OK);
            }

        }
    }
}