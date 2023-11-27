<?php

namespace Rules\Crear;

class UsuariosRules {
    public const Rules = [
        'nombres' => ['String', 'Required'],
        'apellidos' => ['String', 'Required'],
        'email' => ['Email', 'Required'],
        'identificacion' => ['Number', 'Required'],
        'fecha_nacimiento' => ['Date', 'Required'],
        'username' => ['String', 'Required'],
        'password' => ['String', 'Required'],
        'celular' => ['Number', 'Required'],
    ];
}