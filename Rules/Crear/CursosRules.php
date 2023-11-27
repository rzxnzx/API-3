<?php

namespace Rules\Crear;

class CursosRules
{
    public const Rules = [
        'nombre' => ['String', 'Required'],
        'creditos' => ['Number', 'Required'],
    ];
}