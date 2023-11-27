<?php

namespace Rules\Actualizar;

class UsuariosUpdateRules {
    public const Rules = [
        'nombres' => ['String'],
        'apellidos' => ['String'],
        'email' => ['Email'],
        'identificacion' => ['Number'],
        'fecha_nacimiento' => ['Date'],
        'username' => ['String'],
        'password' => ['String'],
        'celular' => ['Number'],
    ];
}