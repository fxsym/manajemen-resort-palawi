<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResortSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('resorts')->insert([
            [
                'name' => 'Ebony',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1762224275/eboniImage_imemfs.jpg'
            ],
            [
                'name' => 'Acacia',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1762224274/acaciaImage_chaypn.jpg',
            ],
            [
                'name' => 'Agathis',
                'image_url' => 'https://res.cloudinary.com/djfxfwzin/image/upload/v1762224274/agathisImage_r3bnlz.jpg',
            ],
        ]);
    }
}
