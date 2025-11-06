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
            ['order_id' => 1, 'room_id' => 17],
            ['order_id' => 1, 'room_id' => 18],

            // order 2
            ['order_id' => 2, 'room_id' => 1],
            ['order_id' => 2, 'room_id' => 21],
            ['order_id' => 2, 'room_id' => 22],

            // order 3
            ['order_id' => 3, 'room_id' => 2],
            ['order_id' => 3, 'room_id' => 25],

            // order 4
            ['order_id' => 4, 'room_id' => 10],
            ['order_id' => 4, 'room_id' => 11],
            ['order_id' => 4, 'room_id' => 20],

            // order 5
            ['order_id' => 5, 'room_id' => 6],
            ['order_id' => 5, 'room_id' => 7],
            ['order_id' => 5, 'room_id' => 8],

            // order 6
            ['order_id' => 6, 'room_id' => 16],

            // order 7
            ['order_id' => 7, 'room_id' => 14],
            ['order_id' => 7, 'room_id' => 15],

            // order 8
            ['order_id' => 8, 'room_id' => 17],
            ['order_id' => 8, 'room_id' => 18],
            ['order_id' => 8, 'room_id' => 19],
            ['order_id' => 8, 'room_id' => 20],
        ]);
    }
}
