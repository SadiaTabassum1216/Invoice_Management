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
        Schema::create('invoices', function (Blueprint $table) {
            // $table->bigIncrements('invoiceID');
            $table->id();
            $table->date('invoiceDate')->nullable();
            $table->time('invoiceTime')->nullable();
            $table->date('invoiceEstimatedDate')->nullable();
            $table->date('invoiceClosingDate')->nullable();
            $table->double('invoiceTotalCost', 8, 2)->nullable();
            $table->double('invoiceSubtotal', 8, 2)->nullable();
            $table->double('invoiceGrandtotal', 8, 2)->nullable();
            $table->double('invoiceAdditionalCost', 8 ,2)->nullable(); //cost
            $table->string('invoiceStatus')->nullable();
            $table->string('invoiceOffering')->nullable();
            $table->boolean('invoiceIsDone')->nullable();
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};