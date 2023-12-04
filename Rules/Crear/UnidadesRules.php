<?php

namespace Rules\Crear;

class UnidadesRules {
    public const Rules = [
        'cursos_id' => ['Number', 'Required'],
        'usuario_id' => ['Number', 'Required'],
        'nombre' => ['String', 'Required'],
        'introduccion' => ['String', 'Required'],
        'fecha_creacion' => ['Date', 'Required'],
        'hora_creacion' => ['Hour', 'Required'],
        'activa' => ['Required'],
    ];
}