<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductManagementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::middleware('auth')->group(function () {
    Route::get('products', [ProductManagementController::class, 'index']);
    Route::get('products/{id}', [ProductManagementController::class, 'show']);
    Route::post('products', [ProductManagementController::class, 'store']);
    Route::put('products/{id}', [ProductManagementController::class, 'update']);
    Route::delete('products/{id}', [ProductManagementController::class, 'destroy']);
});