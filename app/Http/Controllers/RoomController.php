<?php

namespace App\Http\Controllers;

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

    public function checkAvailability(Request $request)
    {
        $checkIn = $request->input('check_in');
        $checkOut = $request->input('check_out');

        $bookedRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['pending', 'confirmed', 'checked_in'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('orders.check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('orders.check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                        $sub->where('orders.check_in', '<=', $checkIn)
                            ->where('orders.check_out', '>=', $checkOut);
                    });
            })
            ->pluck('order_room.room_id')
            ->toArray();

        $availableRooms = Room::whereNotIn('id', $bookedRoomIds)->get();

        return Inertia::render('CheckAvailability', [
            'resorts' => Resort::with('rooms')->get(),
            'availableRooms' => $availableRooms
        ]);
    }
}
