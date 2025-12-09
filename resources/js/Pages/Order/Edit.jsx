import { useState } from "react"
import { router, useForm } from "@inertiajs/react"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"
import MainLayout from "../../components/layouts/MainLayout"

export default function Edit({ order, selectedResorts = [], selectedRooms = [], allResorts = [], allRooms = [] }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const { data, setData, patch, processing, errors } = useForm({
        name: order?.name || '',
        institution: order?.institution || '',
        position: order?.position || '',
        participants_count: order?.participants_count || 1,
        address: order?.address || '',
        phone_number: order?.phone_number || '',
        total_price: order?.total_price || 0,
        payment_amount: order?.payment_amount || 0,
        check_in: order?.check_in ? order.check_in.split(' ')[0] : '',
        check_out: order?.check_out ? order.check_out.split(' ')[0] : '',
        payment_status: order?.payment_status || 'unpaid',
        status: order?.status || 'pending',
        chooseResorts: selectedResorts,
        chooseRooms: selectedRooms,
    })

    const handleBack = () => {
        router.visit(`/orders/${order.id}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowConfirmModal(true)
    }

    const confirmUpdate = () => {
        patch(`/orders/${order.id}`, {
            onSuccess: () => {
                setShowConfirmModal(false)
            }
        })
    }

    const handleResortChange = (resortId) => {
        const updatedResorts = data.chooseResorts.includes(resortId)
            ? data.chooseResorts.filter(id => id !== resortId)
            : [...data.chooseResorts, resortId]
        setData('chooseResorts', updatedResorts)
    }

    const handleRoomChange = (roomId) => {
        const updatedRooms = data.chooseRooms.includes(roomId)
            ? data.chooseRooms.filter(id => id !== roomId)
            : [...data.chooseRooms, roomId]
        setData('chooseRooms', updatedRooms)
    }

    const paymentStatusOptions = [
        { value: 'unpaid', label: 'Belum Dibayar' },
        { value: 'down_payment', label: 'DP (Down Payment)' },
        { value: 'paid', label: 'Lunas' },
    ]

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'reserved', label: 'Reserved' },
        { value: 'checked_in', label: 'Checked In' },
        { value: 'checked_out', label: 'Checked Out' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'completed', label: 'Completed' },
    ]

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all border border-gray-200 hover:border-indigo-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Kembali</span>
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Booking</h1>
                        <p className="text-gray-600">ID: #{order?.id}</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Informasi Booking</h2>
                        <p className="text-indigo-100">Perbarui data pemesanan resort</p>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Informasi Pemesan */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pemesan</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Institusi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.institution}
                                        onChange={e => setData('institution', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jabatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={e => setData('position', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Telepon <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Peserta <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.participants_count}
                                        onChange={e => setData('participants_count', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.participants_count && <p className="text-red-500 text-sm mt-1">{errors.participants_count}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Tanggal Check-in/out */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Jadwal Menginap</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Check-in <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.check_in}
                                        onChange={e => setData('check_in', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.check_in && <p className="text-red-500 text-sm mt-1">{errors.check_in}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Check-out <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.check_out}
                                        onChange={e => setData('check_out', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.check_out && <p className="text-red-500 text-sm mt-1">{errors.check_out}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Pilih Resort */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Pilih Resort <span className="text-red-500">*</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {allResorts.map(resort => (
                                    <label key={resort.id} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.chooseResorts.includes(resort.id)}
                                            onChange={() => handleResortChange(resort.id)}
                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="font-medium text-gray-900">{resort.name}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.chooseResorts && <p className="text-red-500 text-sm mt-1">{errors.chooseResorts}</p>}
                        </div>

                        {/* Pilih Kamar */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Pilih Kamar <span className="text-red-500">*</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {allRooms.map(room => (
                                    <label key={room.id} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.chooseRooms.includes(room.id)}
                                            onChange={() => handleRoomChange(room.id)}
                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="font-medium text-gray-900">{room.name}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.chooseRooms && <p className="text-red-500 text-sm mt-1">{errors.chooseRooms}</p>}
                        </div>

                        {/* Pembayaran */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pembayaran</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Total Harga <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.total_price}
                                        onChange={e => setData('total_price', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.total_price && <p className="text-red-500 text-sm mt-1">{errors.total_price}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Dibayar <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.payment_amount}
                                        onChange={e => setData('payment_amount', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.payment_amount && <p className="text-red-500 text-sm mt-1">{errors.payment_amount}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Pembayaran <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.payment_status}
                                        onChange={e => setData('payment_status', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    >
                                        {paymentStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.payment_status && <p className="text-red-500 text-sm mt-1">{errors.payment_status}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Status Booking */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Booking</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Konfirmasi Perubahan</h3>
                        </div>
                        
                        <p className="text-gray-600">
                            Apakah Anda yakin akan mengedit data booking ini? Perubahan akan disimpan ke database.
                        </p>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmUpdate}
                                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Ya, Edit Data'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}