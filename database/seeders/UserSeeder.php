<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Fatih Syamsudin',
                'phone' => '0895357517490',
                'username' => 'fxsym31',
                'email' => 'fsyamsudin24@gmail.com',
                'password' => Hash::make('fxsym31'),
                'role' => 'admin',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1759995034/Fatih_Syamsudin_qshr46.jpg',
            ],
        ]);
    }
}
