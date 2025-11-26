import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../components/layouts/MainLayout";
import LoadingStateCheckAvailability from "../components/ui/LoadingStateCheckAvailability";
import NoResultCheckAvailability from "../components/ui/NoResultCheckAvailability";
import NightsInfo from "../components/ui/NightsInfo";
import ResortHeaderCheckAvailability from "../components/ui/ResortHeaderCheckAvailability";
import { getRoomStatusIcon, getRoomStatusStyle, getRoomStatusText } from "../utils/checkAvailbility";
import LegendColorCheckAvailability from "../components/ui/LegendColorCheckAvailability";
import SearchButtonCheckAvailability from "../components/ui/SearchButtonCheckAvailability";
import OrderDetailsModal from "../components/ui/OrderDetailsModal";

export default function CheckAvailability({ resorts }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [resortsWithStatus, setResortsWithStatus] = useState([]);

  // TAMBAH STATE UNTUK MODAL
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Silakan isi tanggal Check-In dan Check-Out terlebih dahulu.");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    router.post(
      "/check-availability",
      {
        check_in: checkIn,
        check_out: checkOut,
      },
      {
        onSuccess: (page) => {
          const available = page.props.availableRooms || [];
          const resortsData = page.props.resorts || [];

          console.log("Available Rooms:", available);
          console.log("Resorts with Status:", resortsData);

          setAvailableRooms(available);
          setResortsWithStatus(resortsData);
          setLoading(false);
        },
        onError: (error) => {
          console.error("❌ Gagal cek:", error);
          setLoading(false);
        },
        preserveScroll: true,
      }
    );
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // UPDATE FUNGSI handleRoomClick
  const handleRoomClick = (room, status) => {
    if (status === 'available') {
      router.visit(`/room/${room.id}`);
    } else if (status === 'unavailable' || status === 'pending') {
      // Tampilkan modal dengan detail orders (bisa multiple)
      // Sebelumnya mungkin check room.order_details saja
      // Sekarang check room.order_details dan length > 0
      if (room.order_details && room.order_details.length > 0) {
        setSelectedOrder(room.order_details); // Kirim array
        setSelectedRoomName(room.name);
        setIsModalOpen(true);
      } else {
        alert('Detail pemesanan tidak tersedia');
      }
    }
  };

  // FUNGSI UNTUK TUTUP MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedRoomName("");
  };

  const getResortStats = (rooms) => {
    const available = rooms.filter(r => r.availability_status === 'available').length;
    const pending = rooms.filter(r => r.availability_status === 'pending').length;
    const unavailable = rooms.filter(r => r.availability_status === 'unavailable').length;

    return { available, pending, unavailable, total: rooms.length };
  };

  const nights = calculateNights();
  const displayResorts = hasSearched ? resortsWithStatus : resorts;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto py-12 px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-[#1E828F]">
              Cek Ketersediaan Kamar
            </h1>
            <p className="text-gray-600 text-lg">
              Temukan kamar impian Anda dengan mudah dan cepat
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100 transform transition-all hover:shadow-3xl">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Check-In Date */}
              <div className="space-y-2">
                <label
                  htmlFor="checkIn"
                  className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide"
                >
                  <svg
                    className="w-5 h-5 text-[#1E828F]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Check-In
                </label>
                <input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all outline-none"
                  required
                />
              </div>

              {/* Check-Out Date */}
              <div className="space-y-2">
                <label
                  htmlFor="checkOut"
                  className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide"
                >
                  <svg
                    className="w-5 h-5 text-[#1E828F]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Check-Out
                </label>
                <input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all outline-none"
                  required
                />
              </div>

              {/* Search Button */}
              <SearchButtonCheckAvailability handleCheckAvailability={handleCheckAvailability} loading={loading} />
            </div>

            {/* Nights Info */}
            {nights > 0 && (
              <NightsInfo nights={nights} />
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <LoadingStateCheckAvailability />
          )}

          {/* Legend Keterangan Warna - Tampil setelah search */}
          {!loading && hasSearched && (
            <LegendColorCheckAvailability />
          )}

          {/* Results Section */}
          {!loading && hasSearched && displayResorts.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Hasil Ketersediaan Kamar
                </h2>
                <p className="text-gray-600">
                  Menampilkan status dari {displayResorts.reduce((sum, r) => sum + r.rooms.length, 0)} kamar
                </p>
              </div>

              {displayResorts.map((resort, idx) => {
                const stats = getResortStats(resort.rooms);

                return (
                  <div
                    key={resort.id}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform transition-all hover:shadow-2xl"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    {/* Resort Header */}
                    <ResortHeaderCheckAvailability stats={stats} resort={resort} />

                    {/* Room Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {resort.rooms.map((room) => {
                        const status = room.availability_status || 'available';
                        const isClickable = status === 'available' || status === 'unavailable' || status === 'pending';

                        return (
                          <div
                            key={room.id}
                            onClick={() => handleRoomClick(room, status)}
                            className={`relative p-6 rounded-xl shadow-md transform transition-all ${getRoomStatusStyle(status)}`}
                          >
                            {/* Status Badge */}
                            <div className="absolute top-2 right-2">
                              {getRoomStatusIcon(status)}
                            </div>

                            {/* Room Icon */}
                            <div className="mb-3">
                              <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                              </svg>
                            </div>

                            {/* Room Name */}
                            <h4 className="font-bold text-lg mb-2">
                              {room.name}
                            </h4>

                            {/* Status Text */}
                            <p className="text-sm font-semibold">
                              {getRoomStatusText(status)}
                            </p>

                            {/* Click indicator */}
                            {isClickable && (
                              <div className="mt-2 text-xs opacity-90">
                                {status === 'available' ? 'Klik untuk detail →' : 'Klik untuk info pemesanan →'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {!loading && hasSearched && availableRooms.length === 0 && resortsWithStatus.length === 0 && (
            <NoResultCheckAvailability setCheckIn={setCheckIn} setCheckOut={setCheckOut} setHasSearched={setHasSearched} setResortsWithStatus={setResortsWithStatus} />
          )}
        </div>
      </div>

      {/* TAMBAH MODAL */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderDetails={selectedOrder}
        roomName={selectedRoomName}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </MainLayout>
  );
}