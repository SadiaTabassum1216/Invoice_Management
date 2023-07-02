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
        Schema::create('invoice_item_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoiceItemID');
            $table->string('level');
            $table->string('filename');
            $table->string('path');
            $table->timestamps();

            $table->foreign('invoiceItemID')->references('id')->on('invoice_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_item_files');
    }
};
