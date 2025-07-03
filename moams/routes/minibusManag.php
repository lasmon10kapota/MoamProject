<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MinibusController;
use App\Http\Controllers\MinibusOwnershipController;

Route::prefix('minibuses')->name('minibuses.')->group(function () {
    Route::get('/', [MinibusController::class, 'index'])->name('index');
    Route::get('/create', [MinibusController::class, 'create'])->name('create');
    Route::post('/', [MinibusController::class, 'store'])->name('store');
    Route::get('/{minibus}', [MinibusController::class, 'show'])->name('show');
    Route::get('/{minibus}/edit', [MinibusController::class, 'edit'])->name('edit');
    Route::put('/{minibus}', [MinibusController::class, 'update'])->name('update');
    Route::delete('/{minibus}', [MinibusController::class, 'destroy'])->name('destroy');
    // Archive routes
    Route::post('/{minibus}/archive', [MinibusController::class, 'archive'])->name('archive');
    Route::post('/{minibus}/unarchive', [MinibusController::class, 'unarchive'])->name('unarchive');
    // Ownership transfer
    Route::get('/{minibus}/transfer', [MinibusOwnershipController::class, 'transfer'])->name('transfer');
    Route::post('/{minibus}/transfer', [MinibusOwnershipController::class, 'processTransfer'])->name('transfer.process');
    // Transfer request
    Route::get('/{minibus}/transfer/request', [MinibusOwnershipController::class, 'requestTransfer'])->name('transfer.request');
    Route::post('/{minibus}/transfer/request', [MinibusOwnershipController::class, 'storeTransferRequest'])->name('transfer.request.store');
    // Transfer requests list (for association clerks)
    Route::get('/transfer-requests', [MinibusOwnershipController::class, 'listTransferRequests'])
        ->name('transfer.requests')
        ->middleware('role:association clerk');
    // Ownership history
    Route::get('/{minibus}/history', [MinibusOwnershipController::class, 'history'])->name('history');
    Route::get('/{minibus}/history-page', [MinibusOwnershipController::class, 'historyPage'])->name('history.page');
});