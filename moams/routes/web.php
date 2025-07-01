<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('makePayment', function () {
    return Inertia::render('makePayment');
})->name('makePayment');

Route::post('makePayment', [PaymentController::class, 'store'])->name('makePayment.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'userRoles' => $user ? $user->roles()->pluck('name')->toArray() : []
        ]);
    })->name('dashboard');
    Route::get('/debug-roles', [UserRoleController::class, 'debug']);

    // Placeholder routes for features under development
    Route::get('payments', function () {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'userRoles' => $user ? $user->roles()->pluck('name')->toArray() : [],
            'message' => 'Payment management is under development.'
        ]);
    })->name('payments');

    Route::get('complaints', function () {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'userRoles' => $user ? $user->roles()->pluck('name')->toArray() : [],
            'message' => 'Complaint management is under development.'
        ]);
    })->name('complaints');

    Route::get('offenses', function () {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'userRoles' => $user ? $user->roles()->pluck('name')->toArray() : [],
            'message' => 'Offense management is under development.'
        ]);
    })->name('offenses');
});

Route::middleware(['auth', 'verified', 'role:system admin'])->group(function () {
    // User Management Routes
    Route::get('/admin/users', [RegisteredUserController::class, 'index'])->name('admin.users');
    Route::get('/admin/users/{user}', [RegisteredUserController::class, 'show'])->name('admin.users.show');
    Route::get('/admin/users/{user}/edit', [RegisteredUserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [RegisteredUserController::class, 'update'])->name('admin.users.update');
    Route::patch('/admin/users/{user}', [RegisteredUserController::class, 'update'])->name('admin.users.patch');
    Route::delete('/admin/users/{user}', [RegisteredUserController::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/admin/create-user', [RegisteredUserController::class, 'create'])->name('admin.createUser');
    Route::post('/admin/create-user', [RegisteredUserController::class, 'storeUser'])->name('admin.storeUser');

    // Role Management Routes (keeping existing)
    Route::get('/users', [UserRoleController::class, 'index'])->name('users');
    Route::get('/roles', [UserRoleController::class, 'roles']);
    Route::post('/users/{user}/roles', [UserRoleController::class, 'update']);
});

require __DIR__ . '/memberReg.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/userManag.php';
