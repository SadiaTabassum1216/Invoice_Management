<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $invoice = Invoice::findOrFail($id);

        // Update the invoice attributes individually
        $invoice->invoiceDate = $request->input('invoiceDate');
        $invoice->invoiceTime = $request->input('invoiceTime');
        $invoice->invoiceEstimatedDate = $request->input('invoiceEstimatedDate');
        $invoice->invoiceClosingDate = $request->input('invoiceClosingDate');
        $invoice->invoiceTotalCost = $request->input('invoiceTotalCost');
        $invoice->invoiceSubtotal = $request->input('invoiceSubtotal');
        $invoice->invoiceGrandtotal = $request->input('invoiceGrandtotal');
        $invoice->invoiceAdditionalCost = $request->input('invoiceAdditionalCost');
        $invoice->invoiceStatus = $request->input('invoiceStatus');
        $invoice->invoiceOffering = $request->input('invoiceOffering');
        $invoice->invoiceIsDone = $request->input('invoiceIsDone');

        try {
            // Save the changes to the invoice
            $invoice->save();

            return response()->json(['message' => 'Invoice updated successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during the update process
            return response()->json(['message' => 'Failed to update invoice'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $invoice = Invoice::find($id);

        if (!$invoice) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }

        $invoice->delete();

        return response()->json([
            "message" => "User has been deleted"
        ], 200);
    }
}
