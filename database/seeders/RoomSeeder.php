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

        // AC1 - AC4
        for ($i = 1; $i <= 4; $i++) {
            DB::table('rooms')->insert([
                'name' => 'AC' . $i,
                'resort_id' => 2,
            ]);
        }

        // AC1 - AC6 (resort 3)
        for ($i = 1; $i <= 6; $i++) {
            DB::table('rooms')->insert([
                'name' => 'AC' . $i,
                'resort_id' => 3,
            ]);
        }
    }
}
