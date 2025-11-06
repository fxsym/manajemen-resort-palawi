import { useForm, router } from "@inertiajs/react";
import MainLayout from "../../components/layouts/MainLayout";
import { useEffect, useState } from "react";

export default function Buat({ resorts }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
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
        chooseRooms: []
    });

    const [availableRooms, setAvailableRooms] = useState([]);
    const [loadingAvailability, setLoadingAvailability] = useState(false);

    const [selectedResorts, setSelectedResorts] = useState([]);

    useEffect(() => {
        const filtered = resorts.filter(r => data.chooseResorts.includes(r.id));
        setSelectedResorts(filtered);
    }, [data.chooseResorts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        // Validasi manual sebelum submit
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
            onError: (err) => {
                console.log("❌ Error validasi:", err);
            },
            onSuccess: () => {
                console.log("✅ Booking berhasil!");
            },
        });
    };

    const handleCheckAvailability = () => {
        clearErrors();
        setLoadingAvailability(true);

        if (!data.check_in || !data.check_out) {
            setError("check_in", "Isi tanggal check-in dan check-out terlebih dahulu.");
            setLoadingAvailability(false);
            return;
        }

        router.post(
            "/check-availability-order",
            {
                check_in: data.check_in,
                check_out: data.check_out,
                resort_ids: data.chooseResorts,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const available = page.props.availableRooms; // ambil dari props inertia response
                    setAvailableRooms(available);

                    const updatedResorts = resorts.map(resort => ({
                        ...resort,
                        rooms: resort.rooms.map(room => ({
                            ...room,
                            status: available.find(r => r.id === room.id)
                                ? "available"
                                : "booked",
                        })),
                    }));

                    setSelectedResorts(updatedResorts.filter(r => data.chooseResorts.includes(r.id)));
                },
                onError: (err) => {
                    console.error("❌ Gagal cek ketersediaan:", err);
                },
                onFinish: () => {
                    setLoadingAvailability(false);
                },
            }
        );
    };


    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-4">Buat Booking Resort</h1>

            <div className="flex justify-center py-8">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl backdrop-blur-sm shadow-2xl text-primary w-full max-w-5xl bg-white/70"
                >
                    {/* Kolom Kiri */}
                    <div className="flex flex-col gap-5">
                        {[
                            { id: "name", label: "Nama Pemesan", type: "text" },
                            { id: "institution", label: "Institusi Pemesan", type: "text" },
                            { id: "position", label: "Jabatan Pemesan", type: "text" },
                            { id: "participants_count", label: "Jumlah Peserta", type: "number" },
                            { id: "address", label: "Alamat", type: "text" },
                        ].map(({ id, label, type }) => (
                            <div key={id}>
                                <label htmlFor={id} className="font-medium">{label}</label>
                                <input
                                    id={id}
                                    type={type}
                                    value={data[id]}
                                    onChange={e => setData(id, e.target.value)}
                                    className="w-full border-primary border-2 p-2 rounded-xl"
                                />
                                {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Kolom Kanan */}
                    <div className="flex flex-col gap-5">
                        {[
                            { id: "phone_number", label: "Nomor Telepon", type: "text" },
                            { id: "rooms_count", label: "Jumlah Kamar", type: "number" },
                            { id: "price", label: "Harga", type: "number" },
                            { id: "check_in", label: "Tanggal Check-In", type: "date" },
                            { id: "check_out", label: "Tanggal Check-Out", type: "date" },
                        ].map(({ id, label, type }) => (
                            <div key={id}>
                                <label htmlFor={id} className="font-medium">{label}</label>
                                <input
                                    id={id}
                                    type={type}
                                    value={data[id]}
                                    onChange={e => setData(id, e.target.value)}
                                    className="w-full border-primary border-2 p-2 rounded-xl"
                                />
                                {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Pilih Resort */}
                    <div className="md:col-span-2 flex flex-col mt-4">
                        <p className="font-medium mb-2">Pilih Resort</p>
                        <div className="flex flex-wrap gap-4">
                            {resorts.map(({ id, name }) => (
                                <div key={id} className="flex items-center gap-2">
                                    <input
                                        id={`resort-${id}`}
                                        type="checkbox"
                                        value={id}
                                        checked={data.chooseResorts.includes(id)}
                                        onChange={e => {
                                            const selectedId = parseInt(e.target.value);
                                            if (e.target.checked) {
                                                setData("chooseResorts", [...data.chooseResorts, selectedId]);
                                            } else {
                                                setData(
                                                    "chooseResorts",
                                                    data.chooseResorts.filter(resortId => resortId !== selectedId)
                                                );
                                            }
                                            clearErrors("chooseResorts");
                                        }}
                                        className="w-4 h-4 border-primary border-2 rounded"
                                    />
                                    <label htmlFor={`resort-${id}`} className="font-medium">{name}</label>
                                </div>
                            ))}
                        </div>
                        {errors.chooseResorts && (
                            <p className="text-red-500 text-sm mt-2">{errors.chooseResorts}</p>
                        )}
                    </div>

                    {/* Pilih Kamar */}
                    {selectedResorts.length > 0 && (
                        <div className="md:col-span-2 mt-6">
                            <h3 className="text-xl font-semibold mb-4">Pilih Kamar</h3>

                            {selectedResorts.map(resort => (
                                <div key={resort.id} className="mb-6">
                                    <h4 className="font-medium mb-2">{resort.name}</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {resort.rooms.map(({ id, name, status }) => (
                                            <label
                                                key={id}
                                                htmlFor={`room-${id}`}
                                                className={`p-4 rounded-lg cursor-pointer transition-all shadow-md border-2 ${status === 'booked'
                                                    ? 'bg-red-200 border-red-400 text-red-700 cursor-not-allowed opacity-70'
                                                    : data.chooseRooms.includes(id)
                                                        ? 'bg-green-600 text-white border-green-700'
                                                        : 'bg-green-100 hover:bg-green-200 border-green-400'
                                                    }`}
                                            >
                                                <input
                                                    id={`room-${id}`}
                                                    type="checkbox"
                                                    value={id}
                                                    disabled={status === 'booked'}
                                                    checked={data.chooseRooms.includes(id)}
                                                    onChange={e => {
                                                        const roomId = parseInt(e.target.value);
                                                        if (e.target.checked) {
                                                            setData("chooseRooms", [...data.chooseRooms, roomId]);
                                                        } else {
                                                            setData(
                                                                "chooseRooms",
                                                                data.chooseRooms.filter(rid => rid !== roomId)
                                                            );
                                                        }
                                                        clearErrors("chooseRooms");
                                                    }}
                                                    className="hidden"
                                                />
                                                <p className="font-medium">{name}</p>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {errors.chooseRooms && (
                                <p className="text-red-500 text-sm">{errors.chooseRooms}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleCheckAvailability}
                        disabled={loadingAvailability || data.chooseResorts.length === 0}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-2 hover:bg-blue-700 transition-colors"
                    >
                        {loadingAvailability ? "Memeriksa..." : "Cek Ketersediaan Kamar"}
                    </button>


                    {/* Tombol Submit */}
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`bg-primary text-white font-medium py-3 px-8 rounded-lg 
                                hover:bg-primary/80 focus:ring-2 focus:ring-primary focus:ring-offset-2 
                                transition-colors shadow-sm flex items-center gap-2`}
                        >
                            {processing ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
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
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                "Buat Booking"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
