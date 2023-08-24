<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;
    protected $table = 'invoice_items';

    // protected $primaryKey = 'invoiceItemID';

    protected $fillable = [
        // 'invoiceID',
        'userID',
        'invoiceItemQTY',
        'uomID',
        'invoiceItemFirstPrice',
        'invoiceItemLastPrice',
        'invoiceItemVAT',
        'invoiceItemUnitprice',
        'invoiceItemQouteAdditionalCost',
        'invoiceitemPurchaseAdditionalCost',
        'invoiceItemDeliveryAdditionalCost',
        'invoiceItemTotalPrice',
        'invoiceItemPOD',
        'invoiceItemClosingDate',
        'invoiceItemPurchasePrice',
        'invoiceItemFirstPaymentPrice',
        'invoiceItemFirstPaymentDate',
        'invoiceItemLastPaymentPrice',
        'invoiceItemLastPaymentDate',
        'invoiceItemLogisticCompany',
        'invoiceItemLogisticLocation',
        'invoiceItemLogisitEstimatedDate',
        'invoiceItemShippingStatus',
        'invoiceItemDeliveredToIraq',
        'invoiceItemDeliverByLogisic',
        'invoiceItemDeliverToClient',
        'invoiceItemLogisticCost',
        'invoiceItemFullPaid',
        'invoiceItemSubmitted',
        'invoiceItemStatus',
        'invoiceItemIsFirstPaymentDone',
        'invoiceItemIsLastPaymentDone',
        'invoiceItemOrigin',
        'invoiceItemManufacturer',
        'invoiceItemPartNumber',
    ];
    protected $casts = [
        'invoiceItemDeliveredToIraq' => 'boolean',
        'invoiceItemDeliverByLogisic' => 'boolean',
        'invoiceItemDeliverToClient' => 'boolean',
        'invoiceItemFullPaid' => 'boolean',
        'invoiceItemSubmitted' => 'boolean',
        'invoiceItemIsFirstPaymentDone' => 'boolean',
        'invoiceItemIsLastPaymentDone' => 'boolean',
    ];



    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoiceID');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function uom()
    {
        return $this->belongsTo(Uom::class, 'uomID');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'invoice_item_item', 'invoice_item_id', 'item_id');
    }

    public function invoiceItemFiles()
    {
        return $this->hasMany(InvoiceItemFile::class, 'invoiceItemID');
    }
}