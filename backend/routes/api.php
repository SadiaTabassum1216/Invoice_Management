<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InvoiceItemController;
use App\Http\Controllers\Api\InvoiceItemFileController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Will not go into the final version 

Route::get('/test', function (Request $request) {

    //     Log::info($request->all());
//     return response()->json(['message' => 'Request logged.',
// 'request' => $request->all()]);

    // ob_start(); // Start output buffering
    // var_dump($request->all()); // Perform the var_dump on the desired variable
    // $dumpOutput = ob_get_clean(); // Get the dumped output and clean the buffer

    // return response()->json(['dumpOutput' => $dumpOutput]);

    dd($request);
});

Route::get('/ping', function (Request $request) {
    return response()->json(['message' => 'Pong']);
})->middleware('jwt.auth');


Route::prefix('auth')->middleware('api')->namespace('App\Http\Controllers\Api')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('signup', [AuthController::class, 'register']);
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/items', [ItemController::class, 'index']);
Route::get('/searchItem', [ItemController::class, 'searchItems']);
Route::post('/items', [ItemController::class, 'store']);
Route::get('/items/{id}', [ItemController::class, 'show']);
Route::put('/items/{id}', [ItemController::class, 'update']);
Route::delete('/items/{id}', [ItemController::class, 'destroy']);

Route::post('/invoice', [InvoiceItemController::class, 'store']);
Route::get('/invoice', [InvoiceItemController::class, 'show']);

Route::get('/file_download/{id}', [InvoiceItemFileController::class, 'downloadFile']);