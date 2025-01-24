<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReferralController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// api/login
Route::controller(ReferralController::class)->group(function () {
    Route::get('/referrals', 'list');
    Route::get('/referrals/{id}', 'get');
    Route::post('/referrals', 'create');
    Route::put('/referrals/{id}', 'update');
    Route::delete('/referrals/{id}', 'delete');
});

Route::fallback(function () {

    return response()->json([
        'success' => false,
        'message' => "Not Found"
    ], JsonResponse::HTTP_NOT_FOUND);
});
