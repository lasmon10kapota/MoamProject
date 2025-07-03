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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Deprecated: now linked via membership
            $table->foreignId('membership_id')->constrained('memberships')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('type'); // Registration, affiliation, Fine
            $table->string('method'); // Mobile money, Bank transfer, Cash
            $table->date('payment_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
