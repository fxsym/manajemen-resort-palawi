import React from "react"; 
import MainLayout from "../components/layouts/MainLayout"; 
 
// SVG Icons 
const BedIcon = () => ( 
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"> 
    <path d="M20 9.557V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.525 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.475-.811-2.75-2-3.443zM18 7v2.139c-1.215.911-2 2.346-2 3.861h-2c0-1.858-1.28-3.411-3-3.858V7h7zM6 7h4v2.142c-1.72.447-3 2-3 3.858H5c0-1.515-.785-2.95-2-3.861V7h3z" /> 
  </svg> 
); 
 
const DollarIcon = () => ( 
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"> 
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" /> 
  </svg> 
); 
 
const HotelIcon = () => ( 
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"> 
    <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z" /> 
  </svg> 
); 
 
const TrendingUpIcon = () => ( 
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"> 
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /> 
  </svg> 
); 
 
// Card Komponen 
const CardDashboard = ({ title, info, Icon, trend, trendValue, bgColor }) => ( 
  <div 
    className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`} 
  > 
    <div className="flex items-start justify-between mb-4"> 
      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm"> 
        <Icon /> 
      </div> 
      {trend && ( 
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs backdrop-blur-sm"> 
          <TrendingUpIcon /> 
          <span>{trendValue}</span> 
        </div> 
      )} 
    </div> 
    <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3> 
    <p className="text-3xl font-bold">{info}</p> 
  </div> 
); 
 
export default function Dashboard({ 
  roomsBookedThisMonth = 45, 
  revenueThisMonth = "Rp 65.000.000", 
  availableRooms = [], 
}) { 
  return ( 
    <MainLayout> 
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Resort</h1>
            <p className="text-gray-600">
              Selamat datang kembali! Berikut ringkasan performa resort anda.
            </p>
          </div>
          {/* Cards dengan flex dan gap */} 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
            <CardDashboard 
              title="Kamar Terboking Bulan Ini" 
              info={roomsBookedThisMonth} 
              Icon={BedIcon} 
              bgColor="from-[#1E828F] to-[#15717D]" 
            /> 
            <CardDashboard 
              title="Pendapatan Bulan Ini" 
              info={revenueThisMonth} 
              Icon={DollarIcon} 
              bgColor="from-green-500 to-green-600" 
            /> 
            <CardDashboard 
              title="Kamar Tersedia Hari Ini" 
              info={availableRooms.length || 23} 
              Icon={HotelIcon} 
              bgColor="from-purple-500 to-purple-600" 
            /> 
          </div> 
        </div> 
      </div> 
    </MainLayout> 
  ); 
}