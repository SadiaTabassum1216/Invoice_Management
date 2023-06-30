<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $primaryKey = 'itemID';
    protected $fillable = [
        'itemName',
        'itemDesc',
        'itemSource',
        'itemStatus',
    ];
    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class, 'itemID');
    }
}