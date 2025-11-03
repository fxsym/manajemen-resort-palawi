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
        DB::table('rooms')->insert([
            [
                'name' => 'EA1',
                'status' => 'available',
                'resort_id' => '1',
            ],
            [
                'name' => 'EA2',
                'status' => 'available',
                'resort_id' => '1',
            ],
            [
                'name' => 'AC1',
                'status' => 'available',
                'resort_id' => '2',
            ],
            [
                'name' => 'AC2',
                'status' => 'available',
                'resort_id' => '2',
            ],
            [
                'name' => 'AC3',
                'status' => 'available',
                'resort_id' => '2',
            ],
            [
                'name' => 'AC4',
                'status' => 'available',
                'resort_id' => '2',
            ],
            [
                'name' => 'AG1',
                'status' => 'available',
                'resort_id' => '3',
            ],
            [
                'name' => 'AG2',
                'status' => 'available',
                'resort_id' => '3',
            ],
        ]);
    }
}
