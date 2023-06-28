<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InvoiceItemController extends Controller
{
    public function store(Request $request)
    {

        $dateString = $request->input('invoiceDate');
        $carbonDate = Carbon::parse($dateString);

        $invoice = new Invoice();
        $invoice->invoiceDate = $carbonDate->toDateString();
        $invoice->invoiceTime = $carbonDate->toTimeString();
        $invoice->invoiceTotalCost = $request->input('totalCost');
        $invoice->invoiceStatus = $request->input('status');
        $invoice->save();

        $itemsData = $request->input('itemList');

        foreach ($itemsData as $itemData) {
            $invoiceItem = new InvoiceItem();
            $invoiceItem->itemID = $itemData['itemId'];
            $invoiceItem->invoiceID = $invoice->invoiceID;
            $invoiceItem->invoiceItemFirstprice = $itemData['firstPrice'];
            $invoiceItem->invoiceItemLastprice = $itemData['lastPrice'];
            $invoiceItem->invoiceItemQTY = $itemData['quantity'];
            $invoiceItem->invoiceItemVAT = $itemData['VAT'];
            $invoiceItem->invoiceItemUnitprice = $itemData['unitPrice'];
            $invoiceItem->invoiceItemQouteAdditioncost = $itemData['additionalCost'];
            $invoiceItem->invoiceitemPurchaseAdditioncost = $itemData['purchaseAdditionalCost'];
            $invoiceItem->invoiceItemDeliveryAdditioncost = $itemData['deliveryAdditionalCost'];
            $invoiceItem->invoiceItemTotalprice = $itemData['totalPrice'];
            $invoiceItem->invoiceItemPOD = $itemData['POD'];
            $invoiceItem->invoiceItemClosingDate = $itemData['closingDate'];
            $invoiceItem->invoiceItemPurchaseprice = $itemData['purchasePrice'];
            $invoiceItem->invoiceItemIsFirstPaymentDone = $itemData['isFirstPaymentDone'];
            $invoiceItem->invoiceItemFirstPaymentDate = $itemData['firstPaymentDate'];
            $invoiceItem->invoiceItemIsLastPaymentDone = $itemData['isLastPaymentDone'];
            $invoiceItem->invoiceItemLogisticCompany = $itemData['logisticCompany'];
            $invoiceItem->invoiceItemLogisticLocation = $itemData['logisticLocation'];
            $invoiceItem->invoiceItemLogisitEstimatedDate = $itemData['logisticEstimatedDate'];
            $invoiceItem->invoiceItemShippingStatus = $itemData['shippingStatus'];
            $invoiceItem->invoiceItemDeliveredToIraq = $itemData['isDeliveredToIraq'];
            $invoiceItem->invoiceItemDeliverByLogisic = $itemData['isDeliveredByLogistic'];
            $invoiceItem->invoiceItemDeliverToClient = $itemData['isDeliverToClient'];
            $invoiceItem->invoiceItemLogisticCost = $itemData['logisticCost'];
            $invoiceItem->invoiceItemFullPaid = $itemData['isFullyPaid'];
            $invoiceItem->invoiceItemSubmitted = $itemData['isSubmitted'];
            $invoiceItem->invoiceItemStatus = $itemData['status'];


            $invoiceItem->save();

            $invoice->invoiceItems()->save($invoiceItem);
        }

        return response()->json(['message' => 'Invoice stored successfully', 'id' => $invoice->invoiceID], 201);
    }
}
