<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
   
    public function index()
    {
        $items = Item::all();
        return ItemResource::collection($items);
    }

   
    public function store(Request $request)
    {
        $item = Item::create($request->all());
        return new ItemResource($item);
    }

   
    public function show($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        return new ItemResource($item);
    }


    public function update(Request $request, $id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->update($request->all());
        return new ItemResource($item);
    }

   
    public function destroy($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->delete();
        return response()->json(null, 204);
    } 
}
