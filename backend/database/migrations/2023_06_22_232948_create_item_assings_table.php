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
        Schema::create('item_assings', function (Blueprint $table) {
            $table->bigIncrements('itemassignID');
            $table->date('itemassignDate');
            $table->string('itemassignAdmin');
            $table->unsignedBigInteger('userID');
            $table->unsignedBigInteger('invoiceItemID');
            $table->timestamps();

            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('invoiceItemID')->references('id')->on('invoice_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_assings');
    }
};