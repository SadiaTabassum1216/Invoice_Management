<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 10; $i++) {
            DB::table('items')->insert([
                'itemName' => $faker->word,
                'itemDesc' => $faker->sentence,
                'itemSource' => $faker->url,
                'itemStatus' => $faker->randomElement(['In stock', 'Out of stock ']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

}