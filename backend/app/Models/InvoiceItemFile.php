<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItemFile extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoiceItemID',
        'level',
        'file',
    ];

    public function invoiceItem()
    {
        return $this->belongsTo(InvoiceItem::class, 'invoiceItemID');
    }
}