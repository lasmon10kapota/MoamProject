<?php
use App\Http\Controllers\MinibusOwnerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('memberReg/registerOwner', function () {
    return Inertia::render('memberReg/registerOwner');
})->name('registerOwner');
Route::get('memberReg/registerMinibus', function () {
    return Inertia::render('memberReg/registerMinibus');
})->name('registerMinibus');
Route::get('memberReg/registerDriver', function () {
    return Inertia::render('memberReg/registerDriver');
})->name('registerDriver');
Route::get('memberReg/reviewRegInfor', function () {
    return Inertia::render('memberReg/reviewRegInfor');
})->name('reviewRegInfor');

Route::middleware('guest')->group(function () {
    Route::get('registerOwner', [MinibusOwnerController::class, 'create'])
        ->name('registerOwner');

    Route::post('registerOwner', [MinibusOwnerController::class, 'store']);

});