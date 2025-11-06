import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../components/layouts/MainLayout";

export default function CheckAvailability({ resorts }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Silakan isi tanggal Check-In dan Check-Out terlebih dahulu.");
      return;
    }

    setLoading(true);

    router.post(
      "/check-availability",
      {
        check_in: checkIn,
        check_out: checkOut,
      },
      {
        onSuccess: (page) => {
          // Ambil hasil dari controller (kamu return JSON di Laravel)
          const available = page.props.availableRooms || [];
          console.log(available)
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

  // Helper: cek apakah kamar tersedia
  const isRoomAvailable = (roomId) =>
    availableRooms.some((room) => room.id === roomId);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Cek Ketersediaan Kamar
        </h1>

        {/* Form Input Tanggal */}
        <form
          onSubmit={handleCheckAvailability}
          className="flex flex-col md:flex-row gap-6 bg-white/80 shadow-md p-6 rounded-2xl border border-gray-200"
        >
          <div className="flex flex-col">
            <label htmlFor="checkIn" className="font-medium text-gray-700">
              Tanggal Check-In
            </label>
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border border-primary rounded-lg p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="checkOut" className="font-medium text-gray-700">
              Tanggal Check-Out
            </label>
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border border-primary rounded-lg p-2"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/80 transition-all ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Memeriksa..." : "Cek Ketersediaan"}
            </button>
          </div>
        </form>

        {/* Hasil Ketersediaan */}
        {availableRooms.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Hasil Ketersediaan Kamar
            </h2>

            {resorts.map((resort) => (
              <div key={resort.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{resort.name}</h3>
                <div className="flex flex-wrap gap-4">
                  {resort.rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-4 rounded-lg shadow-md text-white font-medium ${
                        isRoomAvailable(room.id)
                          ? "bg-green-600"
                          : "bg-red-600 opacity-70"
                      }`}
                    >
                      {room.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jika belum cek */}
        {availableRooms.length === 0 && !loading && (
          <p className="text-gray-500 mt-6 text-center">
            Silakan pilih tanggal untuk melihat ketersediaan kamar.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
