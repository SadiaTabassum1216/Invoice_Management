<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;
    protected $primaryKey = 'invoiceItemID';
    protected $fillable = [
        'itemID',
        'invoiceID',
        'userID',
        'invoiceItemQTY',
        'uomID',
        'invoiceItemFirstprice',
        'invoiceItemLastprice',
        'invoiceItemVAT',
        'invoiceItemUnitprice',
        'invoiceItemQouteAdditioncost',
        'invoiceitemPurchaseAdditioncost',
        'invoiceItemDeliveryAdditioncost',
        'invoiceItemTotalprice',
        'invoiceItemPOD',
        'invoiceItemClosingDate',
        'invoiceItemPurchaseprice',
        'invoiceItemFirstPayment',
        'invoiceItemFirstPaymentDate',
        'invoiceItemLastPayment',
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
    ];
    protected $casts = [
        'invoiceItemShippingStatus' => 'boolean',
        'invoiceItemDeliveredToIraq' => 'boolean',
        'invoiceItemDeliverByLogisic' => 'boolean',
        'invoiceItemDeliverToClient' => 'boolean',
        'invoiceItemFullPaid' => 'boolean',
        'invoiceItemSubmitted' => 'boolean',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'itemID');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoiceID');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function uom()
    // {
    //     return $this->belongsTo(Uom::class, 'uomID');
    // }
}