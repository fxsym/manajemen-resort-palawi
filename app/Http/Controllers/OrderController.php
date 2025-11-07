<?php

namespace App\Http\Controllers;

use App\Models\Resort;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $resorts = Resort::with('rooms')->get();

        return Inertia::render('Order/Create', [
            'resorts' => $resorts
        ]);
    }

    public function checkAvailability(Request $request)
    {
        // 1️⃣ Validasi input
        $validated = $request->validate([
            'check_in' => 'required|date',
            'check_out' => 'required|date|after_or_equal:check_in',
            'resort_ids' => 'required|array|min:1',
        ]);

        $checkIn = $validated['check_in'];
        $checkOut = $validated['check_out'];
        $resortIds = $validated['resort_ids'];

        // 2️⃣ Ambil semua resort sesuai ID


        // 3️⃣ Ambil semua room dari resort terpilih
        $allRooms = Room::whereIn('resort_id', $resortIds)->get();

        // 4️⃣ Cari room_id yang sedang digunakan di rentang waktu tsb
        $occupiedRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['pending', 'confirmed', 'checked_in'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereDate('orders.check_in', '<=', $checkOut)
                    ->whereDate('orders.check_out', '>=', $checkIn);
            })
            ->pluck('order_room.room_id')
            ->toArray();

        // 5️⃣ Filter room yang tidak sedang digunakan
        $availableRooms = $allRooms->whereNotIn('id', $occupiedRoomIds)->values();

        $availableRoomIds = $availableRooms->pluck('id');
        $choosedResorts = Resort::with(['rooms' => function ($query) use ($availableRoomIds) {
            $query->whereIn('id', $availableRoomIds);
        }])->whereIn('id', $resortIds)->get();

        $resorts = Resort::with('rooms')->get();

        // 6️⃣ Return ke Inertia
        return Inertia::render('Order/Create', [
            'resorts' => $resorts,
            'choosedResorts' => $choosedResorts,
            'availableRooms' => $availableRooms,
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 🧩 Validasi data input sesuai struktur tabel `orders`
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'participants_count' => 'required|integer|min:1',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:15',
            'price' => 'required|numeric|min:0',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'chooseResorts' => 'required|array|min:1',
            'chooseResorts.*' => 'exists:resorts,id',
            'chooseRooms' => 'required|array|min:1',
            'chooseRooms.*' => 'exists:rooms,id',
        ]);

        // 🧠 Hitung otomatis jumlah hari (days_count)
        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);
        $daysCount = max(1, $checkOut->diffInDays($checkIn)); // minimal 1 hari
        $roomsCount = count($validated['chooseRooms']);

        DB::beginTransaction();
        try {
            // 💾 Simpan ke tabel `orders`
            $orderId = DB::table('orders')->insertGetId([
                'name' => $validated['name'],
                'institution' => $validated['institution'],
                'position' => $validated['position'],
                'participants_count' => $validated['participants_count'],
                'address' => $validated['address'],
                'phone_number' => $validated['phone_number'],
                'user_id' => Auth::id(),
                'rooms_count' => $roomsCount,
                'price' => $validated['price'],
                'days_count' => $daysCount,
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 🏡 Simpan relasi resort ke `order_resort`
            foreach ($validated['chooseResorts'] as $resortId) {
                DB::table('order_resort')->insert([
                    'order_id' => $orderId,
                    'resort_id' => $resortId,
                ]);
            }

            // 🛏️ Simpan relasi kamar ke `order_room` dan ubah statusnya jadi 'booked'
            foreach ($validated['chooseRooms'] as $roomId) {
                DB::table('order_room')->insert([
                    'order_id' => $orderId,
                    'room_id' => $roomId,
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Booking berhasil dibuat!');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
