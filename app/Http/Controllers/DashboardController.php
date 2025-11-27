<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function getRoomsBookedThisMonth()
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $ordersThisMonth = Order::whereBetween('check_in', [$startOfMonth, $endOfMonth])
            ->orWhereBetween('check_out', [$startOfMonth, $endOfMonth])
            ->get();

        $totalRoomsBooked = $ordersThisMonth->sum('rooms_count');

        return $totalRoomsBooked;
    }

public function getRevenueThisMonth()
{
    $startOfMonth = Carbon::now()->startOfMonth();
    $endOfMonth = Carbon::now()->endOfMonth();

    $revenue = Order::whereBetween('check_in', [$startOfMonth, $endOfMonth])
        ->sum('total_price');

    // Format ke Rupiah
    return 'Rp ' . number_format($revenue, 0, ',', '.');
}

    public function getAvailableRoomsToday()
    {
        $today = Carbon::today();

        // Ambil semua room_id yang sedang dipesan hari ini
        $bookedRoomIds = DB::table('order_room')
            ->join('orders', 'order_room.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['pending', 'confirmed', 'checked_in']) // status aktif
            ->whereDate('orders.check_in', '<=', $today)
            ->whereDate('orders.check_out', '>', $today)
            ->pluck('order_room.room_id')
            ->toArray();

        // Ambil kamar yang tidak termasuk dalam bookedRoomIds
        $availableRooms = Room::whereNotIn('id', $bookedRoomIds)->get();
        
        return $availableRooms;
    }

    public function getRecentOrders($limit = 5)
    {
        $recentOrder = Order::orderBy('created_at', 'desc')->take($limit)->get();
        return $recentOrder;
    }

    public function index()
    {
        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
            'roomsBookedThisMonth' =>  $this->getRoomsBookedThisMonth(),
            'revenueThisMonth' => $this->getRevenueThisMonth(),
            'availableRooms' => $this->getAvailableRoomsToday(),
            'recentOrders' => $this->getRecentOrders(),
        ]);
    }
}
