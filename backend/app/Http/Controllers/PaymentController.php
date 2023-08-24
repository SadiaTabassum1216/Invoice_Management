<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $invoice = Invoice::findOrFail($id);

        $invoicePayment = $invoice->invoicePayments()->first();

        $payment = new Payment();
        $payment->invoicePaymentID = $invoicePayment->id;
        $payment->dateTime = $request->input('date');
        $payment->amount = $request->input('amount');
        $payment->note = $request->input('note');

        if ($request->exists('attachment')){
            $file = $request->file('attachment');
            $filename = $file->getClientOriginalName();
            $path = $file->store('secure');

            $payment->attachment = $path;
        }

        $payment->save();


        $payments = $invoicePayment->payments;
        $tot = 0.0;
        foreach($payments as $p){
            $tot += $p->amount;
        }

        $invoicePayment->amountPaid = $tot;
        $invoicePayment->amountRemaining = $invoicePayment->invoiceFinalPrice - $invoicePayment->amountPaid;

        $invoicePayment->save();

        if ($invoicePayment->amountPaid >= $invoicePayment->invoiceFinalPrice){
            $invoice->invoiceIsDone = true;
            $invoice->save();
        }
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
}
