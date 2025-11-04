<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ResortController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
})->name('login')->middleware('guest');
Route::get('/login', function () {
    return inertia('Home');
})->name('login')->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth');

Route::get('/resorts', [ResortController::class, 'index'])->middleware('auth');
Route::get('/resorts/{id}', [ResortController::class, 'show'])->middleware('auth');