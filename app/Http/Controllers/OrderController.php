<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Resort;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Order/Index');
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

        // 2️⃣ Ambil semua room dari resort terpilih 
        $allRooms = Room::whereIn('resort_id', $resortIds)->get();

        // 3️⃣ Cari room dengan status MERAH (reserved, checked_in) - TIDAK TERSEDIA
        $unavailableRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['reserved', 'checked_in'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereDate('orders.check_in', '<=', $checkOut)
                    ->whereDate('orders.check_out', '>=', $checkIn);
            })
            ->pluck('order_room.room_id')
            ->unique()
            ->toArray();

        // 4️⃣ Cari room dengan status KUNING (pending) - MENUNGGU KONFIRMASI
        $pendingRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->where('orders.status', 'pending')
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereDate('orders.check_in', '<=', $checkOut)
                    ->whereDate('orders.check_out', '>=', $checkIn);
            })
            ->pluck('order_room.room_id')
            ->unique()
            ->toArray();

        // 5️⃣ Filter room yang benar-benar tersedia (HIJAU)
        // Room yang tidak ada di unavailable dan tidak ada di pending
        $availableRoomIds = $allRooms
            ->whereNotIn('id', $unavailableRoomIds)
            ->whereNotIn('id', $pendingRoomIds)
            ->pluck('id')
            ->toArray();

        // 6️⃣ Kategorikan semua room berdasarkan status
        $categorizedRooms = $allRooms->map(function ($room) use ($unavailableRoomIds, $pendingRoomIds, $availableRoomIds) {
            if (in_array($room->id, $unavailableRoomIds)) {
                $room->availability_status = 'unavailable'; // MERAH
            } elseif (in_array($room->id, $pendingRoomIds)) {
                $room->availability_status = 'pending'; // KUNING
            } else {
                $room->availability_status = 'available'; // HIJAU
            }
            return $room;
        });

        // 7️⃣ Kelompokkan rooms berdasarkan resort dengan status availability
        $choosedResorts = Resort::with(['rooms' => function ($query) use ($resortIds) {
            $query->whereIn('resort_id', $resortIds);
        }])->whereIn('id', $resortIds)->get();

        // Tambahkan availability_status ke setiap room di choosedResorts
        $choosedResorts = $choosedResorts->map(function ($resort) use ($categorizedRooms) {
            $resort->rooms = $resort->rooms->map(function ($room) use ($categorizedRooms) {
                $categorized = $categorizedRooms->firstWhere('id', $room->id);
                if ($categorized) {
                    $room->availability_status = $categorized->availability_status;
                }
                return $room;
            });
            return $resort;
        });

        $resorts = Resort::with('rooms')->get();

        // 8️⃣ Return ke Inertia 
        return Inertia::render('Order/Create', [
            'resorts' => $resorts,
            'choosedResorts' => $choosedResorts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'participants_count' => 'required|integer|min:1',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:15',
            'total_price' => 'required|numeric|min:0',
            'payment_amount' => 'required|numeric|min:0',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'chooseResorts' => 'required|array|min:1',
            'chooseResorts.*' => 'exists:resorts,id',
            'chooseRooms' => 'required|array|min:1',
            'chooseRooms.*' => 'exists:rooms,id',
        ]);

        // Hitung jumlah hari dan kamar
        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        // ✅ FIX: Balik urutan parameter - checkout DULU, baru checkin
        $daysCount = $checkIn->diffInDays($checkOut);

        $roomsCount = count($validated['chooseRooms']);

        // Tentukan payment_status
        $paymentAmount = $validated['payment_amount'];
        $totalPrice = $validated['total_price'];

        if ($paymentAmount == 0) {
            $paymentStatus = 'unpaid';
        } elseif ($paymentAmount >= $totalPrice) {
            $paymentStatus = 'paid';
        } else {
            $paymentStatus = 'down_payment';
        }

        // Tentukan status order
        $status = ($paymentStatus === 'unpaid') ? 'pending' : 'reserved';

        DB::beginTransaction();
        try {
            // Simpan order
            $orderId = DB::table('orders')->insertGetId([
                'name' => $validated['name'],
                'institution' => $validated['institution'],
                'position' => $validated['position'],
                'participants_count' => $validated['participants_count'],
                'address' => $validated['address'],
                'phone_number' => $validated['phone_number'],
                'user_id' => Auth::id(),
                'rooms_count' => $roomsCount,
                'total_price' => $totalPrice,
                'payment_amount' => $paymentAmount,
                'days_count' => $daysCount,
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'payment_status' => $paymentStatus,
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Simpan relasi resorts
            $resortData = array_map(fn($resortId) => [
                'order_id' => $orderId,
                'resort_id' => $resortId,
            ], $validated['chooseResorts']);
            DB::table('order_resort')->insert($resortData);

            // Simpan relasi rooms
            $roomData = array_map(fn($roomId) => [
                'order_id' => $orderId,
                'room_id' => $roomId,
            ], $validated['chooseRooms']);
            DB::table('order_room')->insert($roomData);

            DB::commit();

            return redirect()->back()->with('success', 'Booking berhasil dibuat!');
        } catch (\Throwable $e) {
            DB::rollBack();

            // Tampilkan error lengkap di terminal Laravel
            info("❌ Order creation failed");
            info($e->getMessage());
            info($e->getTraceAsString());

            // Untuk menampilkan juga di Laravel log file
            Log::error('Order creation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.']);
        }
    }

    public function getOrdersByNameAndCheckinCheckoutDate(Request $request)
    {
        $validated = $request->validate([
            'check_in' => 'required|date',
            'name' => 'required|string',
        ]);

        $checkIn = $validated['check_in'];
        $name = $validated['name'];

        $orders = Order::with(['user', 'rooms', 'resorts'])
            ->where('name', 'LIKE', '%' . $name . '%')
            ->whereDate('check_in', $checkIn)
            ->orderBy('check_in', 'asc')
            ->get();

        return response()->json([
            'message' => $orders->isEmpty() ? 'No orders found' : 'Orders retrieved successfully',
            'data' => $orders
        ], 200);
    }

    public function getOrdersByMonth(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|date_format:Y-m',
        ]);

        $month = $validated['month'];

        // Parse year and month
        [$year, $monthNumber] = explode('-', $month);

        $orders = Order::with(['user', 'rooms', 'resorts'])
            ->whereYear('check_in', $year)
            ->whereMonth('check_in', $monthNumber)
            ->orderBy('check_in', 'asc')
            ->get();

        return response()->json([
            'message' => $orders->isEmpty() ? 'No orders found' : 'Orders retrieved successfully',
            'data' => $orders
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with(['user', 'rooms', 'resorts'])->findOrFail($id);

        return inertia('Order/Show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = DB::table('orders')
            ->where('id', $id)
            ->first();

        if (!$order) {
            return redirect('/orders')->with('error', 'Order tidak ditemukan');
        }

        // Ambil relasi resorts
        $orderResorts = DB::table('order_resort')
            ->where('order_id', $id)
            ->pluck('resort_id')
            ->toArray();

        // Ambil relasi rooms
        $orderRooms = DB::table('order_room')
            ->where('order_id', $id)
            ->pluck('room_id')
            ->toArray();

        // Ambil semua resorts dan rooms untuk dropdown
        $allResorts = DB::table('resorts')->get();
        $allRooms = DB::table('rooms')->get();

        return Inertia::render('Order/Edit', [
            'order' => $order,
            'selectedResorts' => $orderResorts,
            'selectedRooms' => $orderRooms,
            'allResorts' => $allResorts,
            'allRooms' => $allRooms,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'participants_count' => 'required|integer|min:1',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:15',
            'total_price' => 'required|numeric|min:0',
            'payment_amount' => 'required|numeric|min:0',
            // ✅ FIX: Hapus after_or_equal:today untuk edit
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'payment_status' => 'required|in:unpaid,down_payment,paid', // ✅ Tambahkan validasi
            'status' => 'required|in:pending,reserved,checked_in,checked_out,cancelled,completed', // ✅ Tambahkan validasi
            'chooseResorts' => 'required|array|min:1',
            'chooseResorts.*' => 'exists:resorts,id',
            'chooseRooms' => 'required|array|min:1',
            'chooseRooms.*' => 'exists:rooms,id',
        ]);

        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);
        $daysCount = $checkIn->diffInDays($checkOut);
        $roomsCount = count($validated['chooseRooms']);

        // ✅ FIX: Gunakan status dari form, bukan override
        $paymentStatus = $validated['payment_status'];
        $status = $validated['status'];

        // Debug data yang masuk
        Log::info('Update Order Debug', [
            'order_id' => $id,
            'validated' => $validated,
            'days_count' => $daysCount,
            'rooms_count' => $roomsCount,
        ]);

        DB::beginTransaction();
        try {
            // Update data order utama
            DB::table('orders')->where('id', $id)->update([
                'name' => $validated['name'],
                'institution' => $validated['institution'],
                'position' => $validated['position'],
                'participants_count' => $validated['participants_count'],
                'address' => $validated['address'],
                'phone_number' => $validated['phone_number'],
                'rooms_count' => $roomsCount,
                'total_price' => $validated['total_price'],
                'payment_amount' => $validated['payment_amount'],
                'days_count' => $daysCount,
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'payment_status' => $paymentStatus,
                'status' => $status,
                'updated_at' => now(),
            ]);

            // Hapus relasi sebelumnya lalu insert ulang
            DB::table('order_resort')->where('order_id', $id)->delete();
            DB::table('order_room')->where('order_id', $id)->delete();

            // ✅ FIX: Tambahkan timestamps di pivot tables
            $resortData = array_map(fn($resortId) => [
                'order_id' => $id,
                'resort_id' => $resortId,
                'created_at' => now(),
                'updated_at' => now(),
            ], $validated['chooseResorts']);
            DB::table('order_resort')->insert($resortData);

            $roomData = array_map(fn($roomId) => [
                'order_id' => $id,
                'room_id' => $roomId,
                'created_at' => now(),
                'updated_at' => now(),
            ], $validated['chooseRooms']);
            DB::table('order_room')->insert($roomData);

            DB::commit();

            // ✅ FIX: Redirect ke detail order, bukan back
            return redirect()->route('orders.show', $id)->with('success', 'Order berhasil diperbarui!');
        } catch (\Throwable $e) {
            DB::rollBack();

            // Tampilkan error lengkap
            info("❌ Order update failed");
            info($e->getMessage());
            info($e->getTraceAsString());

            Log::error('Order update failed', [
                'order_id' => $id,
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
