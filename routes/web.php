<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ResortController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
})->name('login')->middleware('guest');
Route::get('/login', function () {
    return inertia('Home');
})->name('login')->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth');

Route::get('/resorts', [ResortController::class, 'index'])->middleware('auth');
Route::get('/resorts/{id}', [ResortController::class, 'show'])->middleware('auth');

Route::get('/orders/create', [OrderController::class, 'create'])->middleware('auth');
Route::post('/orders', [OrderController::class, 'store'])->middleware('auth');

Route::get('/check-availability', [RoomController::class, 'showCheckAvailability'])->name('availability.show')->middleware('auth');
Route::post('/check-availability', [RoomController::class, 'checkAvailability'])->name('availability.check')->middleware('auth');

Route::get('/orders', [OrderController::class, 'index'])->middleware('auth');
Route::post('/orders/create', [OrderController::class, 'checkAvailability'])->middleware('auth');

Route::get('/room/{id}', [RoomController::class, 'show'])->name('room.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders/search-by-name-date', [OrderController::class, 'getOrdersByNameAndCheckinCheckoutDate'])->name('orders.search.name-date');
    Route::post('/orders/search-by-month', [OrderController::class, 'getOrdersByMonth'])->name('orders.search.month');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
});
