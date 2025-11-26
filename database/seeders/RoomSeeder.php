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
        // EA1 - EA8
        for ($i = 1; $i <= 8; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EA' . $i,
                'resort_id' => 1,
            ]);
        }

        // EB1 - EB8
        for ($i = 1; $i <= 8; $i++) {
            DB::table('rooms')->insert([
                'name' => 'EB' . $i,
                'resort_id' => 1,
            ]);
        }

        // Acacia
        DB::table('rooms')->insert([
            'name' => 'Acacia',
            'resort_id' => 2,
        ]);

        // Agathis
        DB::table('rooms')->insert([
            'name' => 'Agathis',
            'resort_id' => 3,
        ]);
    }
}
