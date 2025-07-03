<?php

// NOTE: The minibus owner is a user with the 'minibus_owner' role, not a separate model.

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
            // user_id refers to a user with the 'minibus_owner' role
            $table->id();
            $table->string('number_plate')->unique();
            $table->string('assigned_route');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('archived')->default(false);
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
