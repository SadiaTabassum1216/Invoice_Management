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
            // $table->bigIncrements('invoiceItemID');

            $table->id();

            $table->unsignedBigInteger('invoiceID');
            $table->unsignedBigInteger('userID')->nullable();
            $table->unsignedBigInteger('uomID')->nullable();
            $table->string('invoiceItemOrigin')->nullable();
            $table->string('invoiceItemManufacturer')->nullable();
            $table->string('invoiceItemPartNumber')->nullable();
            $table->integer('invoiceItemQTY')->nullable();
            $table->string('invoiceItemStatus')->nullable();

            ///////////////////////////////////////////////

            $table->double('invoiceItemFirstPrice', 8, 2)->nullable();
            $table->double('invoiceItemLastPrice', 8, 2)->nullable();
            $table->double('invoiceItemVAT', 8, 2)->nullable();
            $table->double('invoiceItemPurchasePrice', 8, 2)->nullable();

            //////////////////////////////////////////////

            $table->double('invoiceItemUnitPrice', 8, 2)->nullable();
            $table->double('invoiceItemQouteAdditionalCost', 8, 2)->nullable();
            $table->double('invoiceitemPurchaseAdditionalCost', 8, 2)->nullable();
            $table->double('invoiceItemDeliveryAdditionalCost', 8, 2)->nullable();
            $table->string('invoiceItemPOD')->nullable();
            $table->date('invoiceItemClosingDate')->nullable();

            ////////////////////////////////////////////////////
            
            
            $table->boolean('invoiceItemIsFirstPaymentDone')->nullable();
            $table->date('invoiceItemFirstPaymentDate')->nullable();
            $table->double('invoiceItemFirstPaymentPrice', 8, 2)->nullable();
            $table->boolean('invoiceItemIsLastPaymentDone')->nullable();
            $table->date('invoiceItemLastPaymentDate')->nullable();
            $table->double('invoiceItemLastPaymentPrice', 8, 2)->nullable();
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
            
            
            $table->double('invoiceItemTotalPrice', 8, 2)->nullable();


            $table->timestamps();

            $table->foreign('invoiceID')->references('id')->on('invoices')->onDelete('cascade');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('uomID')->references('id')->on('uom_ids')->onDelete('cascade');
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