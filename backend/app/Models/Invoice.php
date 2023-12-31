<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    // protected $primaryKey = 'invoiceID';
    protected $fillable = [
        'invoiceDate',
        'invoiceTime',
        'invoiceEstimateDate',
        'invoiceClosingDate',
        'invoiceTotalCost',
        'invoiceTotalsubtotal',
        'invoiceGrandtotal',
        'invoiceAdditional',
        'invoiceStatus',
        'invoiceIsOffering',
        'invoiceIsDone',
    ];
    protected $casts = [
        'invoiceIsDone' => 'boolean',
    ];

    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class, 'invoiceID');
    }

    public function invoicePayments()
    {
        return $this->hasMany(InvoicePayment::class, 'invoiceID');
    }
}