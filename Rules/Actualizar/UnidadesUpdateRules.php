<?php

namespace Rules\Actualizar;

class UnidadesUpdateRules {
    public const Rules = [
        'cursos_id' => ['Number'],
        'usuario_id' => ['Number'],
        'nombre' => ['String'],
        'introduccion' => ['String'],
        'fecha_creacion' => ['Date'],
        'hora_creacion' => ['Hour'],
        'activa' => ['Boolean'],
    ];
}