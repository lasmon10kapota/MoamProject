<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('makePayment', function () {
    return Inertia::render('makePayment');
})->name('makePayment');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'userRoles' => $user ? $user->roles()->pluck('name')->toArray() : []
        ]);
    })->name('dashboard');
    Route::get('/debug-roles', [UserRoleController::class, 'debug']);
});

Route::middleware(['auth', 'verified', 'role:system admin'])->group(function () {
    Route::get('/users', [UserRoleController::class, 'index'])->name('users');
    Route::get('/roles', [UserRoleController::class, 'roles']);
    Route::post('/users/{user}/roles', [UserRoleController::class, 'update']);
    
    // Admin user creation routes
    Route::get('/admin/create-user', [RegisteredUserController::class, 'create'])->name('admin.createUser');
    Route::post('/admin/create-user', [RegisteredUserController::class, 'store'])->name('admin.storeUser');
});

require __DIR__ . '/memberReg.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
