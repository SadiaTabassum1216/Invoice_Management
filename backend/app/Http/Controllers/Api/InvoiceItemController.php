<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\InvoiceItemFile;
use App\Models\Item;
use App\Models\User;
use App\Notifications\NewInvoiceNotification;
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
        $invoice->invoiceClosingDate = $this->shouldDateBeNull($request->input('invoiceClosingDate'));
        $invoice->invoiceEstimatedDate = $this->shouldDateBeNull($request->input('invoiceEstimatedDate'));
        $invoice->invoiceAdditionalCost = $request->input('additionalCost');
        $invoice->invoiceOffering = $request->input('offering');
        $invoice->invoiceSubtotal = $request->input('subtotal');
        $invoice->invoiceIsDone = $this->getBooleanVal($request->input('isDone'));
        $invoice->save();

        $invoiceItems = [];
        $maxIdx = count($request->input("itemList_quantity"));

        for ($i = 0; $i < $maxIdx; $i++) {

            $item = $this->getItem($request->input('itemList_itemId')[$i]);
            $invoiceItem = new InvoiceItem();
            $invoiceItem->invoiceID = $invoice->id;
            $invoiceItem->userID = $request->input('itemList_userId')[$i];

            $invoiceItem->invoiceItemQTY = $request->input('itemList_quantity')[$i];
            $invoiceItem->uomID = $request->input('itemList_UOMId')[$i];

            $invoiceItem->invoiceItemFirstprice = $request->input('itemList_firstPrice')[$i];
            $invoiceItem->invoiceItemLastprice = $request->input('itemList_lastPrice')[$i];
            $invoiceItem->invoiceItemVAT = $request->input('itemList_VAT')[$i];
            $invoiceItem->invoiceItemUnitPrice = $request->input('itemList_unitPrice')[$i];
            $invoiceItem->invoiceItemQouteAdditionalCost = $request->input('itemList_additionalCost')[$i];
            $invoiceItem->invoiceitemPurchaseAdditionalCost = $request->input('itemList_purchaseAdditionalCost')[$i];
            $invoiceItem->invoiceItemDeliveryAdditionalCost = $request->input('itemList_deliveryAdditionalCost')[$i];
            $invoiceItem->invoiceItemTotalprice = $request->input('itemList_totalPrice')[$i];
            $invoiceItem->invoiceItemPOD = $request->input('itemList_POD')[$i];
            $invoiceItem->invoiceItemClosingDate = $this->shouldDateBeNull($request->input('itemList_closingDate')[$i]);
            $invoiceItem->invoiceItemPurchasePrice = $request->input('itemList_purchasePrice')[$i];
            $invoiceItem->invoiceItemFirstPaymentPrice = $request->input('itemList_firstPaymentPrice')[$i];
            $invoiceItem->invoiceItemFirstPaymentDate = $this->shouldDateBeNull($request->input('itemList_firstPaymentDate')[$i]);
            $invoiceItem->invoiceItemLastPaymentPrice = $request->input('itemList_lastPaymentPrice')[$i];
            $invoiceItem->invoiceItemLastPaymentDate = $this->shouldDateBeNull($request->input('itemList_lastPaymentDate')[$i]);
            $invoiceItem->invoiceItemLogisticCompany = $request->input('itemList_logisticCompany')[$i];
            $invoiceItem->invoiceItemLogisticLocation = $request->input('itemList_logisticLocation')[$i];
            $invoiceItem->invoiceItemLogisitEstimatedDate = $this->shouldDateBeNull($request->input('itemList_logisticEstimatedDate')[$i]);
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

            $employee = User::findOrFail($invoiceItem->userID);
            $employee->notify(new NewInvoiceNotification($invoiceItem));
        }

        $ret_invoice = Invoice::with('invoiceItems.items', 'invoiceItems.invoiceItemFiles')->find($invoice->id);

        return response([
            "message" => "Invoice stored successfully",
            "theInvoice" => $ret_invoice,
        ]);
    }

    private function getBooleanVal($val)
    {
        return $val == 'true' ? true : false;
    }

    private function shouldDateBeNull($date)
    {
        return $date == '1970-01-01' ? null : $date;
    }

    private function getItem($itemName)
    {
        $item = Item::where('itemName', $itemName)->first();

        if ($item) {
            return $item;
        } else {
            $newItem = new Item();
            $newItem->itemName = $itemName;
            $newItem->save();

            return $newItem;
        }
    }
    public function show()
    {
        $invoices = Invoice::with('invoiceItems.items', 'invoiceItems.invoiceItemFiles')->get();
        // return response()->json($invoices);
        return ['data' => $invoices->all()];
    }

    public function update(Request $request, string $id)
    {
        $invoiceItem = InvoiceItem::find($id);
        if (!$invoiceItem) {
            return response()->json(['message' => 'Item not found'], 404);

        }

        $invoiceItem->update($request->all());

        return ['data' => $invoiceItem];
    }

    public function itemShow()
    {
        $invoiceItem = InvoiceItem::with('items', 'invoiceItemFiles')->get();
        return ['data' => $invoiceItem->all()];
    }

    public function createInvoice(Request $request)
    {

        $dateString = $request->input('invoiceDate');
        $carbonDate = Carbon::parse($dateString);

        $invoice = new Invoice();
        $invoice->invoiceDate = $carbonDate->toDateString();
        $invoice->invoiceTime = $carbonDate->toTimeString();
        $invoice->invoiceStatus = $request->input("status");
        $invoice->invoiceClosingDate = $this->shouldDateBeNull($request->input('invoiceClosingDate'));
        $invoice->invoiceEstimatedDate = $this->shouldDateBeNull($request->input('invoiceEstimatedDate'));
        $invoice->invoiceAdditionalCost = $request->input('additionalCost');
        $invoice->save();


        $maxIdx = count($request->input("itemList_quantity"));

        for ($i = 0; $i < $maxIdx; $i++) {

            $item = $this->getItem($request->input('itemList_itemId')[$i]);
            $invoiceItem = new InvoiceItem();
            $invoiceItem->invoiceID = $invoice->id;
            $invoiceItem->userID = $request->input('itemList_userId')[$i];
            $invoiceItem->uomID = $request->input('itemList_UOMId')[$i];
            $invoiceItem->invoiceItemOrigin = $request->input('itemList_origin')[$i];
            $invoiceItem->invoiceItemManufacturer = $request->input('itemList_manufacturer')[$i];
            $invoiceItem->invoiceItemPartNumber = $request->input('itemList_partNumber')[$i];
            $invoiceItem->invoiceItemQTY = $request->input('itemList_quantity')[$i];
            $invoiceItem->invoiceItemStatus = $request->input('itemList_status')[$i];
            
            $invoiceItem->save();
            $item->invoiceItems()->attach($invoiceItem);
            
            $employee = User::findOrFail($invoiceItem->userID);
            $employee->notify(new NewInvoiceNotification($invoiceItem));

        }
        
        return [
            'response' => "Invoice Created Successfully",
        ];
        //     for ($j = 1; $j < 4; $j++) {
        //         if ($request->exists('itemList_uploadedFiles_' . $j . '_' . $i)) {
        //             $files = $request->file('itemList_uploadedFiles_' . $j . '_' . $i);
        //             foreach ($files as $file) {
        //                 $invoiceItemFile = new InvoiceItemFile();
        //                 $invoiceItemFile->invoiceItemID = $invoiceItem->id;
        //                 $invoiceItemFile->level = (string) $j;

        //                 $filename = $file->getClientOriginalName();
        //                 $path = $file->store('secure');
        //                 $invoiceItemFile->filename = $filename;
        //                 $invoiceItemFile->path = $path;
        //                 $invoiceItemFile->save();
        //             }
        //         }
        //     }
        //     $invoiceItem->invoiceItemFirstprice = $request->input('itemList_firstPrice')[$i];
        //     $invoiceItem->invoiceItemLastprice = $request->input('itemList_lastPrice')[$i];
        //     $invoiceItem->invoiceItemVAT = $request->input('itemList_VAT')[$i];
        //     $invoiceItem->invoiceItemUnitPrice = $request->input('itemList_unitPrice')[$i];
        //     $invoiceItem->invoiceItemQouteAdditionalCost = $request->input('itemList_additionalCost')[$i];
        //     $invoiceItem->invoiceitemPurchaseAdditionalCost = $request->input('itemList_purchaseAdditionalCost')[$i];
        //     $invoiceItem->invoiceItemDeliveryAdditionalCost = $request->input('itemList_deliveryAdditionalCost')[$i];
        //     $invoiceItem->invoiceItemTotalprice = $request->input('itemList_totalPrice')[$i];
        //     $invoiceItem->invoiceItemPOD = $request->input('itemList_POD')[$i];
        //     $invoiceItem->invoiceItemClosingDate = $this->shouldDateBeNull($request->input('itemList_closingDate')[$i]);
        //     $invoiceItem->invoiceItemPurchasePrice = $request->input('itemList_purchasePrice')[$i];
        //     $invoiceItem->invoiceItemFirstPaymentPrice = $request->input('itemList_firstPaymentPrice')[$i];
        //     $invoiceItem->invoiceItemFirstPaymentDate = $this->shouldDateBeNull($request->input('itemList_firstPaymentDate')[$i]);
        //     $invoiceItem->invoiceItemLastPaymentPrice = $request->input('itemList_lastPaymentPrice')[$i];
        //     $invoiceItem->invoiceItemLastPaymentDate = $this->shouldDateBeNull($request->input('itemList_lastPaymentDate')[$i]);
        //     $invoiceItem->invoiceItemLogisticCompany = $request->input('itemList_logisticCompany')[$i];
        //     $invoiceItem->invoiceItemLogisticLocation = $request->input('itemList_logisticLocation')[$i];
        //     $invoiceItem->invoiceItemLogisitEstimatedDate = $this->shouldDateBeNull($request->input('itemList_logisticEstimatedDate')[$i]);
        //     $invoiceItem->invoiceItemShippingStatus = $request->input('itemList_shippingStatus')[$i];
        //     $invoiceItem->invoiceItemDeliveredToIraq = $this->getBooleanVal($request->input('itemList_isDeliveredToIraq')[$i]);
        //     $invoiceItem->invoiceItemDeliverByLogisic = $this->getBooleanVal($request->input('itemList_isDeliveredByLogistic')[$i]);
        //     $invoiceItem->invoiceItemDeliverToClient = $this->getBooleanVal($request->input('itemList_isDeliverToClient')[$i]);
        //     $invoiceItem->invoiceItemLogisticCost = $request->input('itemList_logisticCost')[$i];
        //     $invoiceItem->invoiceItemFullPaid = $this->getBooleanVal($request->input('itemList_isFullyPaid')[$i]);
        //     $invoiceItem->invoiceItemSubmitted = $this->getBooleanVal($request->input('itemList_isSubmitted')[$i]);
        //     $invoiceItem->invoiceItemIsFirstPaymentDone = $this->getBooleanVal($request->input('itemList_isFirstPaymentDone')[$i]);
        //     $invoiceItem->invoiceItemIsLastPaymentDone = $this->getBooleanVal($request->input('itemList_isLastPaymentDone')[$i]);


        //     }

        // }
    }


    public function updatePricingLevel($id, Request $request) 
    {

        // dd($request);

        // $files = $request->file('file');

        $names = [];

        // foreach($request->file('file') as $file){
        //     $names[] = $file->getClientOriginalName();
        // }
        return [
            'request' => $request->all(),
            'id' => $id, 
            'files' => $request->files,
            'files2' => $request->file('files'),
        ];
    }
}