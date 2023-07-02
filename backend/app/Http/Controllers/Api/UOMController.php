<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UomResource;
use App\Models\UOM;
use Illuminate\Http\Request;

class UOMController extends Controller
{
    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        if (strlen($searchTerm) >= 1) {
            $uoms = UOM::where('uomName', 'like', "%$searchTerm%")
                ->get();

            return UomResource::collection($uoms);
        }
    }

    public function show(){
        $uoms= UOM:: all();
        return UomResource::collection($uoms);
    }
}