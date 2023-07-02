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
        Schema::create('item_attachments', function (Blueprint $table) {
            $table->bigIncrements('itemattachmentID');
            $table->string('itemattachmentName');
            $table->string('itemattachmentFile');
            $table->unsignedBigInteger('invoiceItemID');
            $table->enum('itemattachmentType', ['Quote', 'Offer', 'Purchase', 'Delivery']);
            $table->boolean('itemattachmentStatus');
            $table->timestamps();

            // Foreign key relationship
            $table->foreign('invoiceItemID')->references('id')->on('invoice_items');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_attachments');
    }
};