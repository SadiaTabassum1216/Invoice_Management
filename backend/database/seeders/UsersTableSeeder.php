<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // DB::table('users')->insert([
        //     'name'=>'admin',
        //     'email'=>'admin@admin',
        //     'password' => Hash::make('admin'),
        //     'username' => 'admin'
        // ]);

        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password' . $i),
                'username' => 'user' . $i,
                'status' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ])->assignRole('employee');
        }
    }
    }