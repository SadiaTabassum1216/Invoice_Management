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
            $table->date('invoiceDate');
            $table->time('invoiceTime');
            $table->date('invoiceEstimateDate');
            $table->date('invoiceClosingDate');
            $table->double('invoiceTotalCost', 8, 2);
            $table->double('invoiceTotalsubtotal', 8, 2);
            $table->double('invoiceGrandtotal', 8, 2);
            $table->text('invoiceAdditional')->nullable();
            $table->boolean('invoiceStatus');
            $table->boolean('invoiceIsOffering');
            $table->boolean('invoiceDone');
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