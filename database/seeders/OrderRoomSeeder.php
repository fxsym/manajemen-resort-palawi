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
            // Order 1 - Resort 1 (EA1, EA2)
            [
                'order_id' => 1,
                'room_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'room_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Order 2 - Resort 2 (AC1, AC2, AC3)
            [
                'order_id' => 2,
                'room_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'room_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'room_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Order 3 - Resort 3 (AG1, AG2)
            [
                'order_id' => 3,
                'room_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'room_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
