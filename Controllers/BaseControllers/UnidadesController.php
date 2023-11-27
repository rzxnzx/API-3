<?php

namespace Controllers\BaseControllers;

use Controllers\Controller;
use Injections\Injectables\Unidades;
use Models\UnidadesModel;
use Build\Responses\UnidadesMessage;
use Validators\Validate;
use Rules\Crear\UnidadesRules;
use Rules\Actualizar\UnidadesUpdateRules;

class UnidadesController extends Controller
{
    private $UnidadesInjection;

    public function __construct(Unidades $Injection)
    {
        $this->UnidadesInjection = $Injection;
    }

    public function listar()
    {
        return $this->Return(200, UnidadesMessage::GET_OK_ALL, $this->UnidadesInjection->ObtenerTodos(), UnidadesModel::GET_ALL_OK);
    }

    public function crear(array $data)
    {
        $errors = Validate::Validate($data, UnidadesRules::Rules, 'crear');

        if (!empty($errors)) {
            return $this->Return(301, UnidadesMessage::INSERT_ERROR, $errors, UnidadesModel::INSERT_ERROR);
        }

        $result = $this->UnidadesInjection->create($data);
        $this->Return(200, UnidadesMessage::INSERT_OK, $result, UnidadesModel::INSERT_OK);
    }

    public function actualizar($id, array $data)
    {
        $unidad = $this->UnidadesInjection->ObtenerUno($id);

        if (!$unidad) {
            $this->Return(404, UnidadesMessage::GET_ERROR, [], UnidadesModel::GET_ERROR);
        } else {
            $errors = Validate::Validate($data, UnidadesUpdateRules::Rules, 'actualizar');

            if (!empty($errors)) {
                return $this->Return(301, UnidadesMessage::INSERT_ERROR, $errors, UnidadesModel::INSERT_ERROR);
            }

            $Result = $this->UnidadesInjection->update($id, $data);

            if ($Result) {
                $updated = $this->UnidadesInjection->ObtenerUno($id);
                $this->Return(200, UnidadesMessage::UPDATE_OK, $updated, UnidadesModel::UPDATE_OK);
            } else {
                $this->Return(500, UnidadesMessage::UPDATE_ERROR, [], UnidadesModel::UPDATE_ERROR);
            }
        }
    }

    public function eliminar($id)
    {
        $unidad = $this->UnidadesInjection->ObtenerUno($id);

        if (!$unidad) {
            $this->Return(404, UnidadesMessage::GET_ERROR, [], UnidadesModel::DELETE_OK);
        } else {
            $unidad = $this->UnidadesInjection->Eliminar($id);

            if ($unidad !== null) {
                $this->Return(200, UnidadesMessage::DELETE_OK, [], UnidadesModel::DELETE_OK);
            }
        }
    }
}
