<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            ->sum('price');

        return $revenue;
    }

    public function getAvailableRooms()
    {
        $availableRooms = Room::where('status', 'available')->count();

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
            'availableRooms' => $this->getAvailableRooms(),
            'recentOrders' => $this->getRecentOrders(),
        ]);
    }
}
