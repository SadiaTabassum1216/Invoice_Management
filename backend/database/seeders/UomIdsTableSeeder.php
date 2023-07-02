<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UomIdsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $uoms = [
            ['uomName' => 'Piece', 'uomStatus' => 'Active'],
            ['uomName' => 'Kilogram', 'uomStatus' => 'Active'],
            ['uomName' => 'Liter', 'uomStatus' => 'Active'],
            ['uomName' => 'Meter', 'uomStatus' => 'Active'],
            ['uomName' => 'Box', 'uomStatus' => 'Active'],
        ];

        foreach ($uoms as $uom) {
            DB::table('uom_ids')->insert([
                'uomName' => $uom['uomName'],
                'uomStatus' => $uom['uomStatus'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}