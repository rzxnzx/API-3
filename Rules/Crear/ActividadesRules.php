<?php

namespace Rules\Crear;

class ActividadesRules {
    public const Rules = [
        'unidad_id' => ['Number', 'Required'],
        'titulo' => ['String', 'Required'],
        'descripcion' => ['String', 'Required'],
        'actividadescol' => ['String', 'Required'],
    ];
}