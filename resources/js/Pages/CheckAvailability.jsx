import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../components/layouts/MainLayout";

export default function CheckAvailability({ resorts }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
          console.log(available);
          setAvailableRooms(available);
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

  const isRoomAvailable = (roomId) =>
    availableRooms.some((room) => room.id === roomId);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

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
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm uppercase tracking-wide opacity-0">
                  Action
                </label>
                <button
                  onClick={handleCheckAvailability}
                  disabled={loading}
                  className={`w-full bg-[#1E828F] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#176672] transform hover:scale-105 transition-all shadow-lg hover:shadow-xl ${
                    loading ? "opacity-60 cursor-not-allowed scale-100" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memeriksa...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Cek Ketersediaan
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Nights Info */}
            {nights > 0 && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-[#1E828F]/10 text-[#1E828F] px-6 py-3 rounded-full font-semibold">
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  {nights} malam menginap
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
              </div>
              <p className="mt-4 text-gray-600 font-medium">
                Sedang memeriksa ketersediaan kamar...
              </p>
            </div>
          )}

          {/* Results Section */}
          {!loading && hasSearched && availableRooms.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Hasil Ketersediaan Kamar
                </h2>
                <p className="text-gray-600">
                  Menampilkan {availableRooms.length} kamar yang tersedia
                </p>
              </div>

              {resorts.map((resort, idx) => {
                const availableCount = resort.rooms.filter((room) =>
                  isRoomAvailable(room.id)
                ).length;

                return (
                  <div
                    key={resort.id}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform transition-all hover:shadow-2xl"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    {/* Resort Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {resort.name}
                        </h3>
                        <p className="text-gray-500">
                          {availableCount} dari {resort.rooms.length} kamar
                          tersedia
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {Math.round((availableCount / resort.rooms.length) * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* Room Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {resort.rooms.map((room) => {
                        const available = isRoomAvailable(room.id);
                        return (
                          <div
                            key={room.id}
                            className={`relative p-6 rounded-xl shadow-md transform transition-all hover:scale-105 ${
                              available
                                ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                                : "bg-gradient-to-br from-red-400 to-red-900 text-white "
                            }`}
                          >
                            {/* Status Badge */}
                            <div className="absolute top-2 right-2">
                              {available ? (
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
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
                              {available ? "Tersedia" : "Tidak Tersedia"}
                            </p>
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
          {!loading && hasSearched && availableRooms.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Tidak Ada Kamar Tersedia
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Maaf, tidak ada kamar yang tersedia untuk tanggal yang Anda
                pilih. Coba pilih tanggal lain.
              </p>
              <button
                onClick={() => {
                  setCheckIn("");
                  setCheckOut("");
                  setHasSearched(false);
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Cari Tanggal Lain
              </button>
            </div>
          )}
        </div>
      </div>

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