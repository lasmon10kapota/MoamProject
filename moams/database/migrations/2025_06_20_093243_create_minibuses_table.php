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
        Schema::create('minibuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('minibus_owner_id')->unique()->constrained('minibus_owners')->onDelete('cascade');
            $table->string('number_plate');
            $table->string('assigned_route');
            $table->string('proof_of_ownership');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minibuses');
    }
};
