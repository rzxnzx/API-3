<?php

namespace Controllers\BaseControllers;

use Controllers\Controller;
use Injections\Injectables\Actividades;
use Models\ActividadesModel;
use Build\Responses\ActividadesMessage;
use Validators\Validate;
use Rules\Crear\ActividadesRules;
use Rules\Actualizar\ActividadesUpdateRules;

class ActividadesController extends Controller
{
    private $ActividadesInjection;

    public function __construct(Actividades $Injection)
    {
        $this->ActividadesInjection = $Injection;
    }

    public function listar()
    {
        return $this->Return(200, ActividadesMessage::GET_OK_ALL, $this->ActividadesInjection->ObtenerTodos(), ActividadesModel::GET_ALL_OK);
    }
    public function obtener($id) {
        $usuario = $this->ActividadesInjection->ObtenerUno($id);
        if ($usuario) {
            $this->Return(200, ActividadesMessage::GET_OK, $usuario, ActividadesModel::GET_OK);
        } else {
            $this->Return(404, ActividadesMessage::GET_ERROR, null, ActividadesModel::GET_ERROR);
        }
    }

    public function crear(array $data)
    {
        $errors = Validate::Validate($data, ActividadesRules::Rules, 'crear');

        if (!empty($errors)) {
            return $this->Return(301, ActividadesMessage::INSERT_ERROR, $errors, ActividadesModel::INSERT_ERROR);
        }

        $result = $this->ActividadesInjection->create($data);
        $this->Return(200, ActividadesMessage::INSERT_OK, $result, ActividadesModel::INSERT_OK);
    }

    public function actualizar($id, array $data)
    {
        $actividad = $this->ActividadesInjection->ObtenerUno($id);

        if (!$actividad) {
            $this->Return(404, ActividadesMessage::GET_ERROR, [], ActividadesModel::GET_ERROR);
        } else {
            $errors = Validate::Validate($data, ActividadesUpdateRules::Rules, 'actualizar');

            if (!empty($errors)) {
                return $this->Return(301, ActividadesMessage::UPDATE_ERROR, $errors, ActividadesModel::UPDATE_ERROR);
            }

            $Result = $this->ActividadesInjection->update($id, $data);

            if ($Result) {
                $updated = $this->ActividadesInjection->ObtenerUno($id);
                $this->Return(200, ActividadesMessage::UPDATE_OK, $updated, ActividadesModel::UPDATE_OK);
            } else {
                $this->Return(500, ActividadesMessage::UPDATE_ERROR, [], ActividadesModel::UPDATE_ERROR);
            }
        }
    }

    public function eliminar($id)
    {
        $actividad = $this->ActividadesInjection->ObtenerUno($id);

        if (!$actividad) {
            $this->Return(404, ActividadesMessage::GET_ERROR, [], ActividadesModel::DELETE_OK);
        } else {
            $actividad = $this->ActividadesInjection->Eliminar($id);

            if ($actividad !== null) {
                $this->Return(200, ActividadesMessage::DELETE_OK, [], ActividadesModel::DELETE_OK);
            }
        }
    }
}
