<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name', '255');
            $table->string('institution', '255');
            $table->string('position', '255')->nullable();
            $table->unsignedInteger('participants_count');
            $table->text('address');
            $table->string('phone_number', '15');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('resort_id')->constrained();
            $table->unsignedInteger('rooms_count');
            $table->unsignedBigInteger('price');
            $table->unsignedInteger('days_count');
            $table->dateTime('check_in')->nullable();
            $table->dateTime('check_out')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
