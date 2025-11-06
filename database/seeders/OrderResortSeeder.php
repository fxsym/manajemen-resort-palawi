<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderResortSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_resort')->insert([
            ['order_id' => 1, 'resort_id' => 2],
            ['order_id' => 2, 'resort_id' => 1],
            ['order_id' => 2, 'resort_id' => 3],
            ['order_id' => 3, 'resort_id' => 1],
            ['order_id' => 3, 'resort_id' => 3],
            ['order_id' => 4, 'resort_id' => 1],
            ['order_id' => 4, 'resort_id' => 2],
            ['order_id' => 5, 'resort_id' => 1],
            ['order_id' => 6, 'resort_id' => 1],
            ['order_id' => 7, 'resort_id' => 1],
            ['order_id' => 8, 'resort_id' => 2],
        ]);
    }
}
