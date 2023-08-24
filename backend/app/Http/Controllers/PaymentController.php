<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoicePayment;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoicePayments = InvoicePayment::with('payments')->get();
        return [
            'invoicePayments' => $invoicePayments,
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $id = $request->input('invoice_id');
        $invoice = Invoice::with('invoicePayments.payments')->findOrFail($id);

        $invoicePayment = $invoice->invoicePayments()->first();

        $payment = new Payment();
        $payment->invoice_payment_id = $invoicePayment->id;
        // $payment->date = $request->input('date');
        $payment->amount = $request->input('amount');
        $payment->note = $request->input('note');

        if ($request->exists('attachment')) {
            $file = $request->file('attachment');
            $filename = $file->getClientOriginalName();
            $path = $file->store('secure');

            $payment->attachment = $path;
        }

        $payment->save();

        // $invoicePayment = InvoicePayment::with('payments')->find($payment->invoicePaymentID);
        $payments = $invoicePayment->payments;
        $tot = 0.0;
        foreach ($payments as $p) {
            $tot += $p->amount;
        }

        $invoicePayment->amountPaid = $tot;
        $invoicePayment->amountRemaining = $invoicePayment->invoiceFinalPrice - $invoicePayment->amountPaid;

        
        if ($invoicePayment->amountPaid >= $invoicePayment->invoiceFinalPrice) {
            $invoice->invoiceIsDone = true;
            $invoicePayment->status = "fully-paid";
        } else {
            $invoice->invoiceIsDone = false;
            $invoicePayment->status = "partially-paid";
        }
        $invoicePayment->save();
        $invoice->save();

        return [
            'message' => 'payment updated successfully',
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function downloadFile($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        $path = $payment->attachment;

        if (!Storage::exists($path)) {
            abort(404);
        }

        return response()->download(Storage::path($path));
    }
}