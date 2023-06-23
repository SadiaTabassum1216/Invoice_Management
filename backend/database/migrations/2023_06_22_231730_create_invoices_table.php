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
            $table->id('invoiceID');
            $table->date('invoiceDate')->nullable();
            $table->time('invoiceTime')->nullable();
            $table->date('invoiceEstimateDate')->nullable();
            $table->date('invoiceClosingDate')->nullable();
            $table->double('invoiceTotalCost', 8, 2)->nullable();
            $table->double('invoiceTotalsubtotal', 8, 2)->nullable();
            $table->double('invoiceGrandtotal', 8, 2)->nullable();
            $table->text('invoiceAdditional')->nullable();
            $table->boolean('invoiceStatus')->nullable();
            $table->boolean('invoiceIsOffering')->nullable();
            $table->boolean('invoiceDone')->nullable();
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