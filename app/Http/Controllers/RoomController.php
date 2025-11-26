<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Resort;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function showCheckAvailability()
    {
        $resorts = Resort::with('rooms')->get();
        return Inertia::render('CheckAvailability', [
            'resorts' => $resorts,
            'availableRooms' => []
        ]);
    }
    public function show(string $id)
    {
        $room = Room::with('resort')->findOrFail($id);
        return Inertia::render('RoomDetail', [
            'room' => $room,
            'message' => 'Data kamar berhasil didapatkan'
        ]);
    }

    // public function checkAvailability(Request $request)
    // {
    //     $checkIn = $request->input('check_in');
    //     $checkOut = $request->input('check_out');

    //     $bookedRoomIds = DB::table('order_room')
    //         ->join('orders', 'order_room.order_id', '=', 'orders.id')
    //         ->whereIn('orders.status', ['pending', 'confirmed', 'checked_in'])
    //         ->where(function ($query) use ($checkIn, $checkOut) {
    //             $query->whereBetween('orders.check_in', [$checkIn, $checkOut])
    //                 ->orWhereBetween('orders.check_out', [$checkIn, $checkOut])
    //                 ->orWhere(function ($sub) use ($checkIn, $checkOut) {
    //                     $sub->where('orders.check_in', '<=', $checkIn)
    //                         ->where('orders.check_out', '>=', $checkOut);
    //                 });
    //         })
    //         ->pluck('order_room.room_id')
    //         ->toArray();

    //     $availableRooms = Room::whereNotIn('id', $bookedRoomIds)->get();

    //     return Inertia::render('CheckAvailability', [
    //         'resorts' => Resort::with('rooms')->get(),
    //         'availableRooms' => $availableRooms
    //     ]);
    // }

    public function checkAvailability(Request $request)
    {
        $checkIn = $request->input('check_in');
        $checkOut = $request->input('check_out');

        // Ambil semua room
        $allRooms = Room::all();

        // MERAH: reserved, checked_in
        $unavailableRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['reserved', 'checked_in'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('orders.check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('orders.check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                        $sub->where('orders.check_in', '<=', $checkIn)
                            ->where('orders.check_out', '>=', $checkOut);
                    });
            })
            ->pluck('order_room.room_id')
            ->unique()
            ->toArray();

        // KUNING: pending
        $pendingRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->where('orders.status', 'pending')
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('orders.check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('orders.check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                        $sub->where('orders.check_in', '<=', $checkIn)
                            ->where('orders.check_out', '>=', $checkOut);
                    });
            })
            ->pluck('order_room.room_id')
            ->unique()
            ->toArray();

        // Kategorikan room
        $categorizedRooms = $allRooms->map(function ($room) use ($unavailableRoomIds, $pendingRoomIds, $checkIn, $checkOut) {
            $room->availability_status = 'available';
            $room->order_details = []; // UBAH dari null ke array

            if (in_array($room->id, $unavailableRoomIds)) {
                $room->availability_status = 'unavailable';

                // AMBIL SEMUA ORDERS yang overlap, bukan hanya satu
                $orders = Order::whereIn('status', ['reserved', 'checked_in'])
                    ->whereHas('rooms', function ($query) use ($room) {
                        $query->where('rooms.id', $room->id);
                    })
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        $query->whereBetween('check_in', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out', [$checkIn, $checkOut])
                            ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                                $sub->where('check_in', '<=', $checkIn)
                                    ->where('check_out', '>=', $checkOut);
                            });
                    })
                    ->with('user')
                    ->orderBy('check_in', 'asc') // Urutkan berdasarkan check_in
                    ->get(); // UBAH dari first() ke get()

                $room->order_details = $orders;
            } elseif (in_array($room->id, $pendingRoomIds)) {
                $room->availability_status = 'pending';

                // AMBIL SEMUA ORDERS pending yang overlap
                $orders = Order::where('status', 'pending')
                    ->whereHas('rooms', function ($query) use ($room) {
                        $query->where('rooms.id', $room->id);
                    })
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        $query->whereBetween('check_in', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out', [$checkIn, $checkOut])
                            ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                                $sub->where('check_in', '<=', $checkIn)
                                    ->where('check_out', '>=', $checkOut);
                            });
                    })
                    ->with('user')
                    ->orderBy('check_in', 'asc')
                    ->get(); // UBAH dari first() ke get()

                $room->order_details = $orders;
            }

            return $room;
        });

        // Pastikan order_details ikut ter-attach ke rooms dalam resorts
        $resorts = Resort::with('rooms')->get();
        $resorts = $resorts->map(function ($resort) use ($categorizedRooms) {
            $resort->rooms = $resort->rooms->map(function ($room) use ($categorizedRooms) {
                $categorized = $categorizedRooms->firstWhere('id', $room->id);
                if ($categorized) {
                    $room->availability_status = $categorized->availability_status;
                    $room->order_details = $categorized->order_details;
                }
                return $room;
            });
            return $resort;
        });

        $availableRoomIds = $allRooms
            ->whereNotIn('id', $unavailableRoomIds)
            ->whereNotIn('id', $pendingRoomIds)
            ->pluck('id')
            ->toArray();

        $availableRooms = $categorizedRooms->whereIn('id', $availableRoomIds)->values();

        return Inertia::render('CheckAvailability', [
            'resorts' => $resorts,
            'availableRooms' => $availableRooms,
        ]);
    }
}
