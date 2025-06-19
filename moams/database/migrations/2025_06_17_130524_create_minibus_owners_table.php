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
        Schema::create('minibus_owners', function (Blueprint $table) {
            $table->id()->primary();
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('district');
            $table->string('village');
            $table->string('national_id');
            $table->string('num_of_vehicles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minibus_owners');
    }
};
