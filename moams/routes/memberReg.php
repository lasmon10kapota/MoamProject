<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:minibus owner'])->group(function () {
    Route::get('memberReg/registerOwner', function () {
        return Inertia::render('memberReg/registerOwner');
    })->name('memberReg.registerOwner');
    Route::get('memberReg/registerMinibus', function () {
        return Inertia::render('memberReg/registerMinibus');
    })->name('registerMinibus');
    Route::post('registerMinibus', [\App\Http\Controllers\MinibusController::class, 'store'])->name('registerMinibus.store');
    Route::get('memberReg/registerDriver', function () {
        return Inertia::render('memberReg/registerDriver');
    })->name('registerDriver');
    Route::get('memberReg/reviewRegInfor', function () {
        return Inertia::render('memberReg/reviewRegInfor');
    })->name('reviewRegInfor');
    Route::post('registerDriver', [\App\Http\Controllers\DriverController::class, 'store'])->name('registerDriver.store');
});

Route::middleware('guest')->group(function () {
    // Removed: Route::get('registerOwner', [MinibusOwnerController::class, 'create'])
});