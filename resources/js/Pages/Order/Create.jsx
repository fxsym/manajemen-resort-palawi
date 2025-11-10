import { useForm, router } from "@inertiajs/react";
import MainLayout from "../../components/layouts/MainLayout";
import { useState } from "react";

export default function Create({ resorts }) {
  const { data, setData, post, processing, errors, setError, clearErrors, reset } =
    useForm({
      name: "",
      institution: "",
      position: "",
      participants_count: "",
      address: "",
      phone_number: "",
      rooms_count: "",
      price: "",
      days_count: "",
      check_in: "",
      check_out: "",
      chooseResorts: [],
      chooseRooms: [],
    });

  const [choosedResorts, setChoosedResorts] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [nullDate, setNullDate] = useState();
  const [successMessage, setSuccessMessage] = useState("");

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

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* ✅ Notifikasi Sukses Besar di Tengah */}
          {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-green-500 text-white font-bold text-3xl px-16 py-10 rounded-3xl shadow-2xl border-4 border-green-300 animate-fade-in-down text-center">
                {successMessage}
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all ${
                      data.chooseResorts.includes(id)
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
                className={`bg-[#1E828F] text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-[#176672] transition-all transform hover:scale-105 ${
                  loadingAvailability ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loadingAvailability ? "Memeriksa..." : "Cek Ketersediaan Kamar"}
              </button>
            </div>

            {/* Hasil Resort & Form Pemesan */}
            {choosedResorts.length > 0 && (
              <div className="space-y-10">
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
                        {rooms.map(({ id: roomId, name: roomName }) => (
                          <label
                            key={roomId}
                            htmlFor={`room-${roomId}`}
                            className={`p-4 rounded-xl text-center cursor-pointer font-semibold shadow-md border-2 transition-all ${
                              data.chooseRooms.includes(roomId)
                                ? "bg-green-500 text-white border-green-600 scale-105"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                            }`}
                          >
                            <input
                              id={`room-${roomId}`}
                              type="checkbox"
                              value={roomId}
                              checked={data.chooseRooms.includes(roomId)}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (e.target.checked) {
                                  setData("chooseRooms", [
                                    ...data.chooseRooms,
                                    value,
                                  ]);
                                } else {
                                  setData(
                                    "chooseRooms",
                                    data.chooseRooms.filter(
                                      (rid) => rid !== value
                                    )
                                  );
                                }
                                clearErrors("chooseRooms");
                              }}
                              className="hidden"
                            />
                            {roomName}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        Tidak ada kamar tersedia di resort ini.
                      </p>
                    )}
                  </div>
                ))}

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
                        { id: "address", label: "Alamat", type: "textarea" },
                        { id: "participants_count", label: "Jumlah Peserta" },
                        { id: "price", label: "Harga" },
                      ].map(({ id, label, type }) => (
                        <div key={id}>
                          <label className="block font-medium mb-1">
                            {label}
                          </label>
                          {type === "textarea" ? (
                            <textarea
                              id={id}
                              rows={4}
                              value={data[id]}
                              onChange={(e) => setData(id, e.target.value)}
                              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all resize-none"
                            />
                          ) : (
                            <input
                              id={id}
                              type="number"
                              value={data[id]}
                              onChange={(e) => setData(id, e.target.value)}
                              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1E828F] focus:ring-2 focus:ring-[#1E828F]/30 transition-all"
                            />
                          )}
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

      {/* ✨ Animasi CSS untuk notifikasi */}
      <style>
        {`
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fadeInDown 0.6s ease-out;
          }
        `}
      </style>
    </MainLayout>
  );
}
