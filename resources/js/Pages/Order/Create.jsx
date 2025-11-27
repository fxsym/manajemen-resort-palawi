import { useForm, router } from "@inertiajs/react";
import MainLayout from "../../components/layouts/MainLayout";
import { useCallback, useEffect, useState } from "react";
import NightsInfo from "../../components/ui/NightsInfo";

export default function Create({ resorts }) {
  const { data, setData, post, processing, errors, setError, clearErrors, reset } =
    useForm({
      name: "",
      institution: "",
      position: "",
      participants_count: "",  // ubah ke string kosong jika ingin konsisten
      address: "",
      phone_number: "",
      total_price: "",         // ubah ke string kosong jika ingin konsisten
      payment_amount: "",      // ✅ TAMBAHKAN INI
      check_in: "",
      check_out: "",
      chooseResorts: [],
      chooseRooms: [],
    });

  const [choosedResorts, setChoosedResorts] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [nullDate, setNullDate] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  // Buat fungsi recalculate dengan useCallback
  const recalculateTotal = useCallback(() => {
    if (!data.check_in || !data.check_out || data.chooseRooms.length === 0 || choosedResorts.length === 0) {
      return;
    }

    const allRooms = choosedResorts.flatMap(resort => resort.rooms);
    const selectedRooms = allRooms.filter(room => data.chooseRooms.includes(room.id));
    const totalRooms = selectedRooms.reduce((sum, r) => sum + r.price, 0);

    const checkin = new Date(data.check_in);
    const checkout = new Date(data.check_out);
    const days = Math.max(1, (checkout - checkin) / (1000 * 60 * 60 * 24));

    const finalTotal = totalRooms * days;

    // Hanya update jika nilai berubah
    if (data.total_price !== finalTotal) {
      setData("total_price", finalTotal);
    }
  }, [data.check_in, data.check_out, data.chooseRooms, data.total_price, choosedResorts, setData]);

  // useEffect tanpa data di dependency
  useEffect(() => {
    recalculateTotal();
  }, [recalculateTotal]);

  // Fungsi untuk mendapatkan styling berdasarkan status
  const getRoomStatusStyle = (status, isSelected) => {
    if (isSelected) {
      return "bg-blue-600 text-white border-blue-700 scale-105";
    }

    switch (status) {
      case 'available': // HIJAU - Tersedia
        return "bg-green-100 text-green-800 border-green-400 hover:bg-green-200";
      case 'pending': // KUNING - Menunggu Konfirmasi
        return "bg-yellow-100 text-yellow-800 border-yellow-400 hover:bg-yellow-200 cursor-not-allowed opacity-75";
      case 'unavailable': // MERAH - Tidak Tersedia
        return "bg-red-100 text-red-800 border-red-400 cursor-not-allowed opacity-60";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Fungsi untuk mendapatkan label status
  const getRoomStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return '✓ Tersedia';
      case 'pending':
        return '⏳ Pesan Belum DP';
      case 'unavailable':
        return '✕ Tidak Tersedia';
      default:
        return '';
    }
  };

  // Fungsi untuk mengecek apakah room bisa dipilih
  const isRoomSelectable = (status) => {
    return status === 'available';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;
    if (data.chooseResorts.length === 0) {
      setError("chooseResorts", "Silakan pilih minimal 1 resort terlebih dahulu.");
      hasError = true;
    }
    if (data.chooseRooms.length === 0) {
      setError("chooseRooms", "Silakan pilih minimal 1 kamar terlebih dahulu.");
      hasError = true;
    }
    if (hasError) return;

    post("/orders", {
      onSuccess: () => {
        setSuccessMessage("Booking berhasil dibuat!");
        reset();
        setChoosedResorts([]);
        setTimeout(() => setSuccessMessage(""), 3000);
      },
    });
  };

  const handleCheckAvailability = () => {
    setNullDate(null);
    if (!data.check_in || !data.check_out || data.chooseResorts.length === 0) {
      setNullDate(
        "Silakan isi tanggal Check-In, Check-Out dan pilih resort terlebih dahulu."
      );
      return;
    }
    setLoadingAvailability(true);

    router.post(
      "/orders/create",
      {
        check_in: data.check_in,
        check_out: data.check_out,
        resort_ids: data.chooseResorts,
      },
      {
        onSuccess: (page) => {
          const choosedResorts = page.props.choosedResorts || [];
          setChoosedResorts(choosedResorts);
          setLoadingAvailability(false);
        },
        onError: (error) => {
          console.error("❌ Gagal cek:", error);
          setLoadingAvailability(false);
        },
      }
    );
  };

  const calculateNights = () => {
    if (!data.check_in || !data.check_out) return 0;
    const start = new Date(data.check_in);
    const end = new Date(data.check_out);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* ✅ Notifikasi Sukses */}
          {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-500 p-6 max-w-md w-full animate-scale-in">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce-slow">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xl text-gray-800">Berhasil!</p>
                    <p className="text-gray-600 text-sm mt-1">{successMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#1E828F] mb-3">
              Buat Booking Resort
            </h1>
            <p className="text-gray-600 text-lg">
              Pilih tanggal, resort, dan kamar untuk mulai memesan
            </p>
          </div>

          {/* Form Utama */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-8 backdrop-blur-sm"
          >
            {/* Bagian Tanggal */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { id: "check_in", label: "Tanggal Check-In" },
                { id: "check_out", label: "Tanggal Check-Out" },
              ].map(({ id, label }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type="date"
                    value={data[id]}
                    onChange={(e) => setData(id, e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all outline-none"
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}
            </div>

            {nullDate && (
              <p className="text-center text-red-500 text-sm">{nullDate}</p>
            )}

            {/* Pilih Resort */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Pilih Resort
              </label>
              <div className="flex flex-wrap gap-4">
                {resorts.map(({ id, name }) => (
                  <label
                    key={id}
                    htmlFor={`resort-${id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all ${data.chooseResorts.includes(id)
                      ? "bg-[#1E828F] text-white border-[#1E828F]"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="checkbox"
                      id={`resort-${id}`}
                      value={id}
                      checked={data.chooseResorts.includes(id)}
                      onChange={(e) => {
                        const selectedId = parseInt(e.target.value);
                        if (e.target.checked) {
                          setData("chooseResorts", [
                            ...data.chooseResorts,
                            selectedId,
                          ]);
                        } else {
                          setData(
                            "chooseResorts",
                            data.chooseResorts.filter(
                              (resortId) => resortId !== selectedId
                            )
                          );
                        }
                        clearErrors("chooseResorts");
                      }}
                      className="hidden"
                    />
                    <span className="font-medium">{name}</span>
                  </label>
                ))}
              </div>
              {errors.chooseResorts && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.chooseResorts}
                </p>
              )}
            </div>

            {/* Tombol Cek */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCheckAvailability}
                className={`bg-[#1E828F] text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-[#176672] transition-all transform hover:scale-105 ${loadingAvailability ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                {loadingAvailability ? "Memeriksa..." : "Cek Ketersediaan Kamar"}
              </button>
            </div>

            {/* Hasil Resort & Form Pemesan */}
            {choosedResorts.length > 0 && (
              <div className="space-y-10">
                {nights > 0 && (
                  <NightsInfo nights={nights} />
                )}
                {/* Legend Keterangan Warna */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3">Keterangan Status Kamar:</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-400"></div>
                      <span className="text-sm text-gray-700">Tersedia (dapat dipesan)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-400"></div>
                      <span className="text-sm text-gray-700">Menunggu Konfirmasi (pending)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-400"></div>
                      <span className="text-sm text-gray-700">Tidak Tersedia (reserved/checked_in)</span>
                    </div>
                  </div>
                </div>

                {choosedResorts.map(({ id: resortId, name, rooms }) => (
                  <div
                    key={resortId}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="text-2xl font-bold text-[#1E828F] mb-4">
                      {name}
                    </h3>

                    {rooms.length > 0 ? (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {rooms.map(({ id: roomId, name: roomName, availability_status }) => {
                          const selectable = isRoomSelectable(availability_status);
                          const isSelected = data.chooseRooms.includes(roomId);

                          return (
                            <label
                              key={roomId}
                              htmlFor={selectable ? `room-${roomId}` : undefined}
                              className={`p-4 rounded-xl text-center font-semibold shadow-md border-2 transition-all ${getRoomStatusStyle(availability_status, isSelected)
                                } ${selectable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                              title={!selectable ? 'Kamar ini tidak tersedia' : 'Klik untuk memilih'}
                            >
                              <input
                                id={`room-${roomId}`}
                                type="checkbox"
                                value={roomId}
                                checked={isSelected}
                                disabled={!selectable}
                                onChange={(e) => {
                                  if (!selectable) return;

                                  const value = parseInt(e.target.value);
                                  let updatedRooms = [];

                                  if (e.target.checked) {
                                    updatedRooms = [...data.chooseRooms, value];
                                  } else {
                                    updatedRooms = data.chooseRooms.filter((rid) => rid !== value);
                                  }

                                  setData("chooseRooms", updatedRooms);
                                  clearErrors("chooseRooms");

                                  // Ambil harga kamar yang terpilih
                                  const selectedRooms = rooms.filter((r) => updatedRooms.includes(r.id));
                                  const totalRooms = selectedRooms.reduce((sum, r) => sum + r.price, 0);

                                  // Hitung beda hari
                                  const checkin = new Date(data.check_in);
                                  const checkout = new Date(data.check_out);
                                  const days = (checkout - checkin) / (1000 * 60 * 60 * 24);

                                  // Kalau jumlah hari < 1 (masih belum pilih tanggal checkout), pakai 1 hari
                                  const total = totalRooms * (days > 0 ? days : 1);

                                  setData("total_price", total);
                                }}
                                className="hidden"
                              />
                              <div className="font-bold mb-1">{roomName}</div>
                              <div className="text-xs font-medium">
                                {getRoomStatusLabel(availability_status)}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        Tidak ada kamar tersedia di resort ini.
                      </p>
                    )}
                  </div>
                ))}

                {/* Error jika tidak ada kamar dipilih */}
                {errors.chooseRooms && (
                  <p className="text-red-500 text-center text-sm font-medium">
                    {errors.chooseRooms}
                  </p>
                )}

                {/* Form Data Pemesan */}
                <div className="bg-white/90 border border-gray-200 rounded-3xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-[#1E828F] mb-6 border-b pb-3">
                    Data Pemesan
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Kiri */}
                    <div className="space-y-4">
                      {[
                        { id: "name", label: "Nama Pemesan" },
                        { id: "phone_number", label: "Nomor Telepon" },
                        { id: "institution", label: "Institusi Pemesan" },
                        { id: "position", label: "Jabatan Pemesan" },
                      ].map(({ id, label }) => (
                        <div key={id}>
                          <label className="block font-medium mb-1">
                            {label}
                          </label>
                          <input
                            id={id}
                            type="text"
                            value={data[id]}
                            onChange={(e) => setData(id, e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all"
                          />
                          {errors[id] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[id]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Kanan */}
                    <div className="space-y-4">
                      {[
                        { id: "address", label: "Alamat" },
                        { id: "participants_count", label: "Jumlah Peserta" },
                        { id: "total_price", label: "Total Harga" },
                        { id: "payment_amount", label: "Total Dibayar" },
                      ].map(({ id, label, type }) => (
                        <div key={id}>
                          <label className="block font-medium mb-1">
                            {label}
                          </label>

                          <input
                            id={id}
                            value={data[id]}
                            onChange={(e) => setData(id, e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all"
                          />

                          {errors[id] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[id]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tombol Submit */}
                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      disabled={processing}
                      className="bg-[#1E828F] text-white font-semibold py-3 px-10 rounded-xl shadow-md hover:bg-[#176672] transform hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {processing ? "Memproses..." : "Buat Booking"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ✨ Animasi CSS */}
      <style>
        {`
          @keyframes scaleIn {
            0% { 
              opacity: 0; 
              transform: scale(0.8);
            }
            100% { 
              opacity: 1; 
              transform: scale(1);
            }
          }
          
          @keyframes bounceSlow {
            0%, 100% { 
              transform: translateY(0);
            }
            50% { 
              transform: translateY(-5px);
            }
          }
          
          .animate-scale-in {
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .animate-bounce-slow {
            animation: bounceSlow 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </MainLayout>
  );
}