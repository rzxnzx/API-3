<?php

namespace Rules\Actualizar;

class ActividadesUpdateRules {
    public const Rules = [
        'unidad_id' => ['Number'],
        'titulo' => ['String'],
        'descripcion' => ['String'],
        'actividadescol' => ['String'],
    ];
}