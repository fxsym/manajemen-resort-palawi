<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'name' => 'Budi Santoso',
                'institution' => 'Universitas Palawi',
                'position' => 'Dosen',
                'participants_count' => 10,
                'address' => 'Jl. Raya Palawi No. 123',
                'phone_number' => '081234567890',
                'user_id' => 1,
                'resort_id' => 1,
                'rooms_count' => 2,
                'price' => 1000000,
                'days_count' => 2,
                'check_in' => Carbon::now()->addDays(1),
                'check_out' => Carbon::now()->addDays(3),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Siti Rahma',
                'institution' => 'PT Palawi Indah',
                'position' => 'Manager',
                'participants_count' => 5,
                'address' => 'Jl. Merdeka No. 45',
                'phone_number' => '082233445566',
                'user_id' => 1,
                'resort_id' => 2,
                'rooms_count' => 3,
                'price' => 1500000,
                'days_count' => 3,
                'check_in' => Carbon::now()->addDays(2),
                'check_out' => Carbon::now()->addDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Andi Pratama',
                'institution' => 'SMK Palawi',
                'position' => 'Guru',
                'participants_count' => 20,
                'address' => 'Jl. Pendidikan No. 10',
                'phone_number' => '087777777777',
                'user_id' => 1,
                'resort_id' => 3,
                'rooms_count' => 2,
                'price' => 1200000,
                'days_count' => 2,
                'check_in' => Carbon::now()->addDays(3),
                'check_out' => Carbon::now()->addDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
