<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\InvoiceItemController;
use App\Http\Controllers\Api\InvoiceItemFileController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UOMController;
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
Route::post('/createInvoice', [InvoiceItemController::class, 'createInvoice']);
Route::post('/updatePricingLevel/{id}', [InvoiceItemController::class, 'updatePricingLevel']);
Route::post('/updateOfferingLevel/{id}', [InvoiceItemController::class, 'updateOfferingLevel']);
Route::post('/updatePurchaseLevel/{id}', [InvoiceItemController::class, 'updatePurchaseLevel']);


Route::put('/invoice/{id}', [InvoiceController::class, 'update']);
Route::delete('/invoice/{id}', [InvoiceController::class, 'destroy']);


Route::get('/file_download/{id}', [InvoiceItemFileController::class, 'downloadFile']);


Route::get('/searchUOM', [UOMController::class, 'show']);
Route::put('/invoice_item/{id}', [InvoiceItemController::class, 'update']);
Route::get('/invoiceitems', [InvoiceItemController::class, 'itemShow']);


Route::get('/notifications', [NotificationController::class, 'index'])->middleware('jwt.auth');
Route::post('/markAsRead/{id}'. [NotificationController::class, 'edit'])->middleware('jwt.auth');