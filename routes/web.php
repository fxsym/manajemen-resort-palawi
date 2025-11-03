<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
})->name('login')->middleware('guest');
Route::get('/login', function () {
    return inertia('Home');
})->name('login')->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth');