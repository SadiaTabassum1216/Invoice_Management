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
        Schema::create('invoice_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoiceID');
            $table->dateTime("date")->nullable();
            $table->text('note')->nullable();
            $table->double('invoiceFinalPrice', 8, 2)->nullable();
            $table->double('amountPaid', 8, 2)->nullable();
            $table->double('amountRemaining', 8, 2)->nullable();
            $table->string('attachment')->nullable();
            $table->string('status')->nullable();
            $table->boolean('isDone')->nullable()->default(false);
            $table->timestamps();

            $table->foreign('invoiceID')->references('id')->on('invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_payments');
    }
};
