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
            // Order 1 (Budi) — Eboni dan Acacia
            [
                'order_id' => 1,
                'resort_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'resort_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Order 2 (Siti) — Acacia dan Agathis
            [
                'order_id' => 2,
                'resort_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'resort_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Order 3 (Andi) — Agathis dan Eboni
            [
                'order_id' => 3,
                'resort_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'resort_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
