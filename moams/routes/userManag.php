<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrivatelyUserController;

Route::middleware(['auth', 'verified', 'role:system admin'])->group(function () {
    // User Management Routes
    Route::get('/admin/users', [PrivatelyUserController::class, 'index'])->name('admin.users');
    Route::get('/admin/users/{user}', [PrivatelyUserController::class, 'show'])->name('admin.users.show');
    Route::get('/admin/users/{user}/edit', [PrivatelyUserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [PrivatelyUserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{user}', [PrivatelyUserController::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/admin/create-user', [PrivatelyUserController::class, 'create'])->name('admin.createUser');
    Route::post('/admin/create-user', [PrivatelyUserController::class, 'storeUser'])->name('admin.storeUser');
});

// This file is kept for potential future user management routes
// Current admin user creation is handled in web.php with AdminController 