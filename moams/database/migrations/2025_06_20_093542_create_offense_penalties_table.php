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
        Schema::create('offense_penalties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offense_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 8, 2)->nullable(); // optional fine
            $table->string('action_taken')->nullable(); // e.g., "warning", "suspension"
            $table->date('penalty_date')->nullable();
            $table->enum('status', ['pending', 'assigned', 'fulfilled'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offense_penalties');
    }
};
