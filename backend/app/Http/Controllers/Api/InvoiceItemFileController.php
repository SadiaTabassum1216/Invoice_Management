<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InvoiceItemFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvoiceItemFileController extends Controller
{
    public function downloadFile($id)
    {
        $invoiceItemFile = InvoiceItemFile::findOrFail($id);
        $path = $invoiceItemFile->path;
        $filename = $invoiceItemFile->filename;

        if (!Storage::exists($path)) {
            abort(404);
        }

        return response()->download(Storage::path($path), $filename);
    }
}