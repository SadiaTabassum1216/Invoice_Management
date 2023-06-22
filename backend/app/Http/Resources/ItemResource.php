<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->itemId,
            'name' => $this->itemName,
            'description' => $this->itemDesc,
            'source' => $this->itemSource,
            'status' => $this->itemStatus,
            'updated_at' => $this->updated_at,
        ];
    }
}