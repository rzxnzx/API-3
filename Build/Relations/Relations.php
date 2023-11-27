<?php

namespace Build\Relations;

class Relations
{
    public const Relations = [
        'unidades' => [
            'cursos' => ['foreign_key' => 'cursos_id', 'table' => 'cursos'],
            'usuario' => ['foreign_key' => 'usuario_id', 'table' => 'usuarios']
        ],
        'actividades' => [
            'unidad' => ['foreign_key' => 'unidad_id', 'table' => 'unidades']
        ]
    ];
}