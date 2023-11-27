<?php

namespace Controllers\BaseControllers;

use Controllers\Controller;
use Injections\Injectables\Usuarios;
use Models\UsuariosModel;
use Build\Responses\UsuariosMessage;
use Validators\Validate;
use Rules\Crear\UsuariosRules;
use Rules\Actualizar\UsuariosUpdateRules;

class UsuariosController extends Controller
{
    private $UsuariosInjection;

    public function __construct(Usuarios $Injection)
    {
        $this->UsuariosInjection = $Injection;
    }

    public function listar()
    {
        return $this->Return(200, UsuariosMessage::GET_OK_ALL, $this->UsuariosInjection->ObtenerTodos(), UsuariosModel::GET_ALL_OK);
    }

    public function obtener($id) {
        $usuario = $this->UsuariosInjection->ObtenerUno($id);
        if ($usuario) {
            $this->Return(200, UsuariosMessage::GET_OK, $usuario, UsuariosModel::GET_OK);
        } else {
            $this->Return(404, UsuariosMessage::GET_ERROR, null, UsuariosModel::GET_ERROR);
        }
    }


    public function crear(array $data)
    {
        $errors = Validate::Validate($data, UsuariosRules::Rules, 'crear');

        if (!empty($errors)) {
            return $this->Return(301, UsuariosMessage::INSERT_ERROR, $errors, UsuariosModel::INSERT_ERROR);
        }

        $result = $this->UsuariosInjection->create($data);
        $this->Return(200, UsuariosMessage::INSERT_OK, $result, UsuariosModel::INSERT_OK);
    }

    public function actualizar($id, array $data)
    {
        $usuario = $this->UsuariosInjection->ObtenerUno($id);


        if (!$usuario) {
            $this->Return(404, UsuariosMessage::GET_ERROR, [], UsuariosModel::GET_ERROR);
        } else {
            $errors = Validate::Validate($data, UsuariosUpdateRules::Rules, 'actualizar');

            if (!empty($errors)) {
                return $this->Return(301, UsuariosMessage::INSERT_ERROR, $errors, UsuariosModel::INSERT_ERROR);
            }
            
            $Result = $this->UsuariosInjection->update($id, $data);

            if ($Result) {
                $updated = $this->UsuariosInjection->ObtenerUno($id);
                $this->Return(200, UsuariosMessage::UPDATE_OK, $updated, UsuariosModel::UPDATE_OK);
            } else {
                $this->Return(500, UsuariosMessage::UPDATE_ERROR, [], UsuariosModel::UPDATE_ERROR);
            }
        }
    }

    public function eliminar($id)
    {
        $usuario = $this->UsuariosInjection->ObtenerUno($id);

        if (!$usuario) {
            $this->Return(404, UsuariosMessage::GET_ERROR, [], UsuariosModel::DELETE_OK);
        } else {
            $usuario = $this->UsuariosInjection->Eliminar($id);

            if ($usuario !== null) {
                $this->Return(200, UsuariosMessage::DELETE_OK, [], UsuariosModel::DELETE_OK);
            }
        }
    }
}
