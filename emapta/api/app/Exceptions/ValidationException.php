<?php

namespace App\Exceptions;

use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException as LaravelValidationException;

class ValidationException extends LaravelValidationException
{
    use ApiResponser;

    public function report(): void
    {
        // Custom reporting logic, such as logging to a third-party service
        // Log::error('ValidationException: ' . $this->getMessage(), [
        //     'exception' => $this,
        // ]);
    }

    public function render(Request $request): JsonResponse
    {
        return $this->errorResponse(
            JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            "There were some problems with your input",
            Arr::undot($this->validator->errors()->toArray()),
        );
    }
}
