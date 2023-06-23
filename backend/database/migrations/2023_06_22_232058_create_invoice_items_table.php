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
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id('invoiceItemID');
            $table->unsignedBigInteger('itemID');
            $table->unsignedBigInteger('userID');
            $table->integer('invoiceItemQTY');
            $table->unsignedBigInteger('uomID');
            $table->double('invoiceItemFirstprice', 8, 2);
            $table->double('invoiceItemLastprice', 8, 2);
            $table->double('invoiceItemVAT', 8, 2);
            $table->double('invoiceItemUnitprice', 8, 2);
            $table->double('invoiceItemQoutAdditioncost', 8, 2);
            $table->double('invoiceitemPurchaseAdditioncost', 8, 2);
            $table->double('invoiceItemDeliveryAdditioncost', 8, 2);
            $table->double('invoiceItemTotalprice', 8, 2);
            $table->text('invoiceItemPOD')->nullable();
            $table->date('invoiceItemClosingDate');
            $table->double('invoiceItemPurchaseprice', 8, 2);
            $table->double('invoiceItemFirstPayment', 8, 2);
            $table->date('invoiceItemFirstPaymentDate')->nullable();
            $table->double('invoiceItemLastPayment', 8, 2);
            $table->date('invoiceItemLastPaymentDate')->nullable();
            $table->string('invoiceItemLogisticCompany')->nullable();
            $table->string('invoiceItemLogisticLocation')->nullable();
            $table->date('invoiceItemLogisitEstimatedDate')->nullable();
            $table->boolean('invoiceItemShippingStatus')->nullable();
            $table->boolean('invoiceItemDeliveredtoIraqi')->nullable();
            $table->boolean('invoiceItemDeliverByLogisic')->nullable();
            $table->boolean('invoiceItemDeliverToClient')->nullable();
            $table->double('invoiceItemLogisticCost', 8, 2)->nullable();
            $table->boolean('invoiceItemFullPaid')->nullable();
            $table->boolean('invoiceItemSubmitted')->nullable();
            $table->string('invoiceItemStatus')->nullable();
            $table->timestamps();

            
            $table->foreign('itemID')->references('itemID')->on('items');
            $table->foreign('userID')->references('id')->on('users');
            $table->foreign('uomID')->references('uomID')->on('uom_ids');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};