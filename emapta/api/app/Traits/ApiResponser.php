<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponser
{
    /**
     * Return a success response.
     *
     * @param mixed $code
     * @param mixed|null $message
     * @param mixed|null $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($code, $message = null, $data = null)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
        ];

        return response()->json(
            $response,
            $code !== 0 ? $code : JsonResponse::HTTP_OK
        );
    }

    /**
     * Create an error response.
     *
     * @param mixed $code The HTTP status code of the error.
     * @param string $message The error message.
     * @param mixed $errors Any additional error details.
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse($code, string $message, $errors = null)
    {
        $data = [
            'success' => false,
            'message' => $message,
        ];

        $data = array_merge(
            $data,
            $errors ? ['errors' => $errors] : []
        );

        return response()->json(
            $data,
            $code !== 0 ? $code : JsonResponse::HTTP_INTERNAL_SERVER_ERROR
        );
    }
}
