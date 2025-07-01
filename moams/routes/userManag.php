<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisteredUserController;

Route::middleware(['auth', 'verified', 'role:system admin'])->group(function () {
    // User Management Routes
    Route::get('/admin/users', [RegisteredUserController::class, 'index'])->name('admin.users');
    Route::get('/admin/users/{user}', [RegisteredUserController::class, 'show'])->name('admin.users.show');
    Route::get('/admin/users/{user}/edit', [RegisteredUserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [RegisteredUserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{user}', [RegisteredUserController::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/admin/create-user', [RegisteredUserController::class, 'create'])->name('admin.createUser');
    Route::post('/admin/create-user', [RegisteredUserController::class, 'storeUser'])->name('admin.storeUser');
    Route::put('/admin/users/{user}/archive', [RegisteredUserController::class, 'archive'])->name('admin.users.archive');
    Route::put('/admin/users/{user}/unarchive', [RegisteredUserController::class, 'unarchive'])->name('admin.users.unarchive');
});

// This file is kept for potential future user management routes
// Current admin user creation is handled in web.php with AdminController 