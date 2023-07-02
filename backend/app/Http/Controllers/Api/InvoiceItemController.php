<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\InvoiceItemFile;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InvoiceItemController extends Controller
{
    public function store(Request $request)
    {

        // return ['request' => $request->all()];

        $dateString = $request->input('invoiceDate');
        $carbonDate = Carbon::parse($dateString);

        $invoice = new Invoice();
        $invoice->invoiceDate = $carbonDate->toDateString();
        $invoice->invoiceTime = $carbonDate->toTimeString();
        $invoice->invoiceTotalCost = $request->input('totalCost');
        $invoice->invoiceStatus = $request->input("status");
        $invoice->invoiceGrandtotal = $request->input('grandTotal');
        $invoice->invoiceClosingDate = $request->input('invoiceClosingDate');
        $invoice->invoiceEstimatedDate = $request->input('invoiceEstimatedDate');
        $invoice->invoiceAdditionalCost = $request->input('additionalCost');
        $invoice->invoiceOffering = $request->input('offering');
        $invoice->invoiceSubtotal = $request->input('subtotal');
        $invoice->invoiceIsDone = $this->getBooleanVal($request->input('isDone'));
        $invoice->save();

        $a = [2, 5, 2];
        $b = [1, 2, 3];
        $c = [1, 2, 3];

        $invoiceItems = [];
        $maxIdx = count($request->input("itemList_quantity"));

        $IIDs = [];
        for ($i = 0; $i < $maxIdx; $i++) {

            // $item = Item::findOrFail($request->input('itemList_itemId')[$i]);
            $item = Item::findOrFail($a[$i]);

            $invoiceItem = new InvoiceItem();
            $invoiceItem->invoiceID = $invoice->id;
            // $invoiceItem->userID = $request->input('itemList_userId')[$i];
            $invoiceItem->userID = $b[$i];


            $invoiceItem->invoiceItemQTY = $request->input('itemList_quantity')[$i];
            // $invoiceItem->uomID = $request->input('itemList_UOMId')[$i];
            $invoiceItem->uomID = $c[$i];



            $invoiceItem->invoiceItemFirstprice = $request->input('itemList_firstPrice')[$i];
            $invoiceItem->invoiceItemLastprice = $request->input('itemList_lastPrice')[$i];
            $invoiceItem->invoiceItemVAT = $request->input('itemList_VAT')[$i];
            $invoiceItem->invoiceItemUnitPrice = $request->input('itemList_unitPrice')[$i];
            $invoiceItem->invoiceItemQouteAdditionalCost = $request->input('itemList_additionalCost')[$i];
            $invoiceItem->invoiceitemPurchaseAdditionalCost = $request->input('itemList_purchaseAdditionalCost')[$i];
            $invoiceItem->invoiceItemDeliveryAdditionalCost = $request->input('itemList_deliveryAdditionalCost')[$i];
            $invoiceItem->invoiceItemTotalprice = $request->input('itemList_totalPrice')[$i];
            $invoiceItem->invoiceItemPOD = $request->input('itemList_POD')[$i];
            $invoiceItem->invoiceItemClosingDate = $request->input('itemList_closingDate')[$i];
            $invoiceItem->invoiceItemPurchasePrice = $request->input('itemList_purchasePrice')[$i];
            $invoiceItem->invoiceItemFirstPaymentPrice = $request->input('itemList_firstPaymentPrice')[$i];
            $invoiceItem->invoiceItemFirstPaymentDate = $request->input('itemList_firstPaymentDate')[$i];
            $invoiceItem->invoiceItemLastPaymentPrice = $request->input('itemList_lastPaymentPrice')[$i];
            $invoiceItem->invoiceItemLastPaymentDate = $request->input('itemList_lastPaymentDate')[$i];
            $invoiceItem->invoiceItemLogisticCompany = $request->input('itemList_logisticCompany')[$i];
            $invoiceItem->invoiceItemLogisticLocation = $request->input('itemList_logisticLocation')[$i];
            $invoiceItem->invoiceItemLogisitEstimatedDate = $request->input('itemList_logisticEstimatedDate')[$i];
            $invoiceItem->invoiceItemShippingStatus = $request->input('itemList_shippingStatus')[$i];
            $invoiceItem->invoiceItemDeliveredToIraq = $this->getBooleanVal($request->input('itemList_isDeliveredToIraq')[$i]);
            $invoiceItem->invoiceItemDeliverByLogisic = $this->getBooleanVal($request->input('itemList_isDeliveredByLogistic')[$i]);
            $invoiceItem->invoiceItemDeliverToClient = $this->getBooleanVal($request->input('itemList_isDeliverToClient')[$i]);
            $invoiceItem->invoiceItemLogisticCost = $request->input('itemList_logisticCost')[$i];
            $invoiceItem->invoiceItemFullPaid = $this->getBooleanVal($request->input('itemList_isFullyPaid')[$i]);
            $invoiceItem->invoiceItemSubmitted = $this->getBooleanVal($request->input('itemList_isSubmitted')[$i]);
            $invoiceItem->invoiceItemStatus = $request->input('itemList_status')[$i];
            $invoiceItem->invoiceItemIsFirstPaymentDone = $this->getBooleanVal($request->input('itemList_isFirstPaymentDone')[$i]);
            $invoiceItem->invoiceItemIsLastPaymentDone = $this->getBooleanVal($request->input('itemList_isLastPaymentDone')[$i]);


            $invoiceItem->save();

            $IIDs[] = $invoiceItem->id;

            $item->invoiceItems()->attach($invoiceItem);

            for ($j = 1; $j < 4; $j++) {
                if ($request->exists('itemList_uploadedFiles_' . $j . '_' . $i)) {
                    $files = $request->file('itemList_uploadedFiles_' . $j . '_' . $i);
                    foreach ($files as $file) {
                        $invoiceItemFile = new InvoiceItemFile();
                        $invoiceItemFile->invoiceItemID = $invoiceItem->id;
                        $invoiceItemFile->level = (string) $j;

                        $filename = $file->getClientOriginalName();
                        $path = $file->store('secure');
                        $invoiceItemFile->filename = $filename;
                        $invoiceItemFile->path = $path;
                        $invoiceItemFile->save();
                    }
                }
            }
        }

        $fileNames = [];



        // $ret_invoice = Invoice::with('invoiceItems.items', 'invoiceItems.invoiceItemFiles')->findOrFail($invoice->invoiceID);
        $ret_invoice = Invoice::with('invoiceItems.items', 'invoiceItems.invoiceItemFiles')->find($invoice->id);

        // $ret_invoice = $invoice->invoiceItems()->get();
        // $ret_invoice = Invoice::with('invoiceItems')->findOrFail($invoice->get();

        return response([
            "response" => $request->all(),
            // "str" => $invoiceItem,
            // "test" => $request->input('itemList_quantity'),
            // "asekina" => $request->exists("itemList_uploadedFiles_1"),
            // "dekhi" => "itemList_uploadedFiles_" . $i,
            "theInvoice" => $ret_invoice,
            // "invoiceID" => $invoice->id,
            // "invoiceItemIDs" => $IIDs,

            "status" => $request->input("status"),
        ]);
    }

    private function getBooleanVal($val)
    {
        return $val == 'true' ? true : false;
    }

    public function show()
    {
        $invoices = Invoice::with('invoiceItems.items', 'invoiceItems.invoiceItemFiles')->get();
        return response()->json($invoices);
    }
}