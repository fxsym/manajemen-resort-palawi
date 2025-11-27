<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // EA1 - EA2 Eksekutif
        for ($i = 1; $i <= 2; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EA' . $i,
                'type' => 'Eksekutif',
                'resort_id' => 1,
                'price' => 600000
            ]);
        }

        // EA3 - EA8 Superior
        for ($i = 3; $i <= 8; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EA' . $i,
                'type' => 'Superior',
                'resort_id' => 1,
                'price' => 450000
            ]);
        }

        // EB1 - EB2 
        for ($i = 1; $i <= 2; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EB' . $i,
                'type' => 'Standart',
                'resort_id' => 1,
                'price' => 350000
            ]);
        }

        // EB3 - EB6
        for ($i = 3; $i <= 6; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EB' . $i,
                'type' => 'Deluxe',
                'resort_id' => 1,
                'price' => 500000
            ]);
        }

        // Acacia
        DB::table('rooms')->insert([
            'name' => 'Acacia',
            'type' => 'All Room',
            'price' => 2400000,
            'resort_id' => 2,
        ]);

        // Agathis
        DB::table('rooms')->insert([
            'name' => 'Agathis',
            'type' => 'All Room',
            'price' => 2700000,
            'resort_id' => 3,
        ]);
    }
}
