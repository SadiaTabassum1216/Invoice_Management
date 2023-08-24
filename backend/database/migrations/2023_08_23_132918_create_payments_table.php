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
            $table->unsignedBigInteger('invoicePaymentID')->nullable();
            $table->dateTime("date")->nullable();
            $table->double('amount', 8, 2)->nullable();
            $table->text('note')->nullable();
            $table->string('attachment')->nullable();
            $table->timestamps();

            $table->foreign('invoicePaymentID')->references('id')->on('invoice_payments')->onDelete('cascade');
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