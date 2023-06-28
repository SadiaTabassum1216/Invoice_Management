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
            $table->unsignedBigInteger('invoiceID');
            $table->unsignedBigInteger('userID')->nullable();
            $table->integer('invoiceItemQTY')->nullable();
            $table->unsignedBigInteger('uomID')->nullable();
            $table->double('invoiceItemFirstprice', 8, 2)->nullable();
            $table->double('invoiceItemLastprice', 8, 2)->nullable();
            $table->double('invoiceItemVAT', 8, 2)->nullable();
            $table->double('invoiceItemUnitprice', 8, 2)->nullable();
            $table->double('invoiceItemQouteAdditioncost', 8, 2)->nullable();
            $table->double('invoiceitemPurchaseAdditioncost', 8, 2)->nullable();
            $table->double('invoiceItemDeliveryAdditioncost', 8, 2)->nullable();
            $table->double('invoiceItemTotalprice', 8, 2)->nullable();
            $table->text('invoiceItemPOD')->nullable();
            $table->date('invoiceItemClosingDate')->nullable();
            $table->double('invoiceItemPurchaseprice', 8, 2)->nullable();
            $table->double('invoiceItemFirstPayment', 8, 2)->nullable();
            $table->date('invoiceItemFirstPaymentDate')->nullable();
            //first payment price, 
            //second payment price these already exist

            $table->double('invoiceItemLastPayment', 8, 2)->nullable();
            $table->date('invoiceItemLastPaymentDate')->nullable();


            $table->string('invoiceItemLogisticCompany')->nullable();
            $table->string('invoiceItemLogisticLocation')->nullable();
            $table->date('invoiceItemLogisitEstimatedDate')->nullable();
            $table->string('invoiceItemShippingStatus')->nullable();
            $table->boolean('invoiceItemDeliveredToIraq')->default(false)->nullable();
            $table->boolean('invoiceItemDeliverByLogisic')->default(false)->nullable();
            $table->boolean('invoiceItemDeliverToClient')->default(false)->nullable();
            $table->double('invoiceItemLogisticCost', 8, 2)->nullable();
            $table->boolean('invoiceItemFullPaid')->nullable();
            $table->boolean('invoiceItemSubmitted')->nullable();
            $table->string('invoiceItemStatus')->nullable();
            $table->boolean('invoiceItemIsFirstPaymentDone')->nullable();
            $table->boolean('invoiceItemIsLastPaymentDone')->nullable();
            
            $table->timestamps();

            
            // $table->foreign('itemID')->references('itemID')->on('items');
            $table->foreign('invoiceID')->references('invoiceID')->on('invoices');
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