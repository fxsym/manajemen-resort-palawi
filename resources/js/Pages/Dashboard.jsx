import CardDashboard from "../components/ui/CardDashboard";
import { FaBed, FaDollarSign } from "react-icons/fa";
import { MdOutlineHotel } from "react-icons/md";
import MainLayout from "../components/layouts/MainLayout";

export default function Dashboard({ roomsBookedThisMonth, revenueThisMonth, availableRooms, recentOrders }) {
    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-4 w-full justify-around">
                <CardDashboard title={"Total kamar di booking bulan ini"} info={roomsBookedThisMonth} Icon={FaBed} />
                <CardDashboard title={"Pendapatan bulan ini"} info={revenueThisMonth} Icon={FaDollarSign} />
                <CardDashboard title={"Kamar tersedia hari ini"} info={availableRooms?.length} Icon={MdOutlineHotel} />
            </div>

            <div>

            </div>
        </MainLayout>
    )
}