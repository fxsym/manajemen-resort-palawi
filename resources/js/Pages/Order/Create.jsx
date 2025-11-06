import { useForm, router } from "@inertiajs/react";
import MainLayout from "../../components/layouts/MainLayout";
import { useEffect, useState } from "react";

export default function Create({ resorts }) {
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
    const [choosedResorts, setChoosedResorts] = useState([])
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [nullDate, setNullDate] = useState()

    const [selectedResorts, setSelectedResorts] = useState([]);

    const handleSubmit = (e) => {

    };

    const handleCheckAvailability = () => {
        setNullDate(null)
        if (!data.check_in || !data.check_out || data.chooseResorts.length === 0) {
            setNullDate("Silakan isi tanggal Check-In, Check-Out dan Pilih Resort terlebih dahulu.")
            return;
        }
        setLoadingAvailability(true)

        router.post(
            "/check-availability-order",
            {
                check_in: data.check_in,
                check_out: data.check_in,
                resort_ids: data.chooseResorts
            },
            {
                onSuccess: (page) => {
                    const available = page.props.availableRooms || [];
                    const choosedResorts = page.props.choosedResorts || [];
                    console.log(choosedResorts)
                    setAvailableRooms(available);
                    setChoosedResorts(choosedResorts)
                    setLoadingAvailability(false);
                },
                onError: (error) => {
                    console.error("❌ Gagal cek:", error);
                    setLoading(false);
                },
                preserveScroll: true,
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
                    {/* Kolom Kanan */}
                    <div className="flex items-center justify-center gap-5 col-span-2">
                        {[
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

                    <div className="flex items-center justify-center gap-5 col-span-2">
                        {nullDate && <p className="text-red-500 text-sm">{nullDate}</p>}
                    </div>

                    <div className="flex items-center justify-center gap-5 col-span-2">
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

                    <div className="flex items-center justify-center gap-5 col-span-2">
                        <button
                            type="button"
                            onClick={handleCheckAvailability}
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-2 hover:bg-blue-700 transition-colors"
                        >
                            {loadingAvailability ? "Memeriksa..." : "Cek Ketersediaan Kamar"}
                        </button>
                    </div>

                    {choosedResorts.length > 0 && (
                        <div className="col-span-2 mt-6 space-y-6">
                            {choosedResorts.map(({ id: resortId, name: resortName, rooms }) => (
                                <div key={resortId} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                    {/* 🏖️ Resort Name */}
                                    <p className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        {resortName}
                                    </p>

                                    {/* 🏠 List Rooms */}
                                    {rooms.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {rooms.map(({ id: roomId, name: roomName }) => (
                                                <label
                                                    key={roomId}
                                                    htmlFor={`room-${roomId}`}
                                                    className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all shadow-md border-2 text-center 
                  ${data.chooseRooms.includes(roomId)
                                                            ? 'bg-green-600 text-white border-green-700 scale-[1.02]'
                                                            : 'bg-green-100 hover:bg-green-200 border-green-400 hover:scale-[1.02]'
                                                        }`}
                                                >
                                                    <input
                                                        id={`room-${roomId}`}
                                                        type="checkbox"
                                                        value={roomId}
                                                        checked={data.chooseRooms.includes(roomId)}
                                                        onChange={e => {
                                                            const value = parseInt(e.target.value);
                                                            if (e.target.checked) {
                                                                setData("chooseRooms", [...data.chooseRooms, value]);
                                                            } else {
                                                                setData(
                                                                    "chooseRooms",
                                                                    data.chooseRooms.filter(rid => rid !== value)
                                                                );
                                                            }
                                                            clearErrors("chooseRooms");
                                                        }}
                                                        className="hidden"
                                                    />

                                                    <p className="font-medium">{roomName}</p>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">
                                            Tidak ada kamar tersedia di resort ini.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}


                </form>
            </div>
        </MainLayout>
    );
}
