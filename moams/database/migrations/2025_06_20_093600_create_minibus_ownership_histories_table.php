<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('minibus_ownership_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('minibus_id')->constrained('minibuses')->onDelete('cascade');
            $table->foreignId('previous_owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('new_owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('transfer_type', ['internal', 'external'])->default('internal');
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->text('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minibus_ownership_histories');
    }
};