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
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1760583289/Users/20251016_025446_fatih-syamsudin.jpg',
            ],
            [
                'name' => 'Marketing',
                'phone' => '08123456700',
                'username' => 'marketing',
                'email' => 'marketing@gmail.com',
                'password' => Hash::make('palawi'),
                'role' => 'admin',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1762739573/rusell_up_eqjzwz.jpg',
            ],
            [
                'name' => 'Admin Resort',
                'phone' => '08123456800',
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('palawi'),
                'role' => 'resort',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1762739573/rusell_up_eqjzwz.jpg',
            ],
        ]);
    }
}
