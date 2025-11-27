<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_room')->insert([
            // order 1
            ['order_id' => 1, 'room_id' => 15],

            // order 2
            ['order_id' => 2, 'room_id' => 1],
            ['order_id' => 2, 'room_id' => 2],
            ['order_id' => 2, 'room_id' => 3],

            // order 3
            ['order_id' => 3, 'room_id' => 7],
            ['order_id' => 3, 'room_id' => 8],

            // order 4
            ['order_id' => 4, 'room_id' => 16],
            ['order_id' => 4, 'room_id' => 4],

            // order 5
            ['order_id' => 5, 'room_id' => 9],
            ['order_id' => 5, 'room_id' => 10],

            // order 6
            ['order_id' => 6, 'room_id' => 3],

            // order 7
            ['order_id' => 7, 'room_id' => 15],

            // order 8
            ['order_id' => 8, 'room_id' => 16],
            ['order_id' => 8, 'room_id' => 1],
            ['order_id' => 8, 'room_id' => 2],
        ]);
    }
}
