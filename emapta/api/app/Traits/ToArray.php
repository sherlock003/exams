<?php

namespace App\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ToArray
{
    /**
     * Convert the model instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        $parentArr = parent::toArray();
        ksort($parentArr);
        return Arr::mapWithKeys($parentArr, function ($value, string $key) {
            return [Str::camel($key) => $value];
        });
    }
}
