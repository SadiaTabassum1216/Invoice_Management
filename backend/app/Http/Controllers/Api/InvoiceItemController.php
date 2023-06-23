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
        //   $request->validate([
        //     'invoiceID' => 'required|string',
        //     'invoiceDate' => 'required|date',
        //     'invoiceTime' => 'required|string',
        //     'itemList' => 'required|array',
        //     'itemList.*.itemId' => 'required|string',
        //     'itemList.*.firstPrice' => 'required|numeric',
        //     'itemList.*.lastPrice' => 'required|numeric',
        //     'itemList.*.quantity' => 'required|numeric',
        //     'itemList.*.VAT' => 'required|numeric',
        //     'itemList.*.unitPrice' => 'required|numeric',
        //     'itemList.*.additionalCost' => 'required|numeric',
        //     'itemList.*.purchaseAdditionalCost' => 'required|numeric',
        //     'itemList.*.deliveryAdditionalCost' => 'required|numeric',
        //     'itemList.*.totalPrice' => 'required|numeric',
        //     'itemList.*.POD' => 'required|string',
        //     'itemList.*.closingDate' => 'required|date',
        //     'itemList.*.purchasePrice' => 'required|numeric',
        //     'itemList.*.isFirstPaymentDone' => 'required|boolean',
        //     'itemList.*.firstPaymentDate' => 'required|date',
        //     'itemList.*.isLastPaymentDone' => 'required|boolean',
        //     'itemList.*.logisticCompany' => 'required|string',
        //     'itemList.*.logisticLocation' => 'required|string',
        //     'itemList.*.logisticEstimatedDate' => 'required|date',
        //     'itemList.*.shippingStatus' => 'required|string',
        //     'itemList.*.isDeliveredToIraq' => 'required|boolean',
        //     'itemList.*.isDeliveredByLogistic' => 'required|boolean',
        //     'itemList.*.isDeliverToClient' => 'required|boolean',
        //     'itemList.*.logisticCost' => 'required|numeric',
        //     'itemList.*.isFullyPaid' => 'required|boolean',
        //     'itemList.*.isSubmitted' => 'required|boolean',
        //     'itemList.*.status' => 'required|string',
        // ]);

        $dateString = $request->input('invoiceDate');
        $carbonDate = Carbon::createFromFormat('D M d Y H:i:s e+', $dateString);

        $invoice = new Invoice();
        // $invoice->invoiceID = $request->input('invoiceID');
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

            // $invoiceItem->invoiceItemLastPaymentDate = $itemData['lastPaymentDate'];
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

        return response()->json(['message' => 'Invoice stored successfully'], 201);

    }
}