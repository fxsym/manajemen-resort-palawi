import { router } from "@inertiajs/react"
import { ArrowLeft, User, Building2, MapPin, Phone, Calendar, Users, Bed, CreditCard, CheckCircle, Clock } from "lucide-react"
import MainLayout from "../../components/layouts/MainLayout"

// Mock order data - Replace with actual props from Inertia
const mockOrder = {
    id: 1,
    name: "John Doe",
    institution: "PT. Technology Indonesia",
    position: "Manager",
    participants_count: 15,
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phone_number: "081234567890",
    rooms_count: 5,
    total_price: 15000000,
    payment_amount: 15000000,
    days_count: 3,
    check_in: "2024-12-15 14:00:00",
    check_out: "2024-12-18 12:00:00",
    payment_status: "paid",
    status: "reserved",
    user: {
        id: 1,
        name: "Admin User",
        email: "admin@resort.com"
    },
    rooms: [
        { id: 1, name: "Deluxe Room A" },
        { id: 2, name: "Deluxe Room B" },
        { id: 3, name: "Family Suite" }
    ],
    resorts: [
        { id: 1, name: "Mountain Resort Paradise" }
    ],
    created_at: "2024-12-01 10:00:00",
    updated_at: "2024-12-01 10:00:00"
}

export default function Show({ order = mockOrder }) {
    const handleBack = () => {
        router.visit('/orders')
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
            reserved: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
            checked_in: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
            checked_out: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
            cancelled: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
            completed: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
        }
        return statusConfig[status] || statusConfig.pending
    }

    const getPaymentBadge = (status) => {
        const statusConfig = {
            unpaid: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
            down_payment: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
            paid: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
        }
        return statusConfig[status] || statusConfig.unpaid
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const statusBadge = getStatusBadge(order.status)
    const paymentBadge = getPaymentBadge(order.payment_status)

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all border border-gray-200 hover:border-indigo-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Kembali</span>
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Detail Booking</h1>
                        <p className="text-gray-600">ID: #{order.id}</p>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className={`${statusBadge.bg} ${statusBadge.border} border-2 rounded-xl p-6 flex items-center gap-4`}>
                        <div className={`${statusBadge.bg} p-3 rounded-lg`}>
                            <CheckCircle className={`w-8 h-8 ${statusBadge.text}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Status Booking</p>
                            <p className={`text-2xl font-bold ${statusBadge.text}`}>
                                {order.status.replace('_', ' ').toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className={`${paymentBadge.bg} ${paymentBadge.border} border-2 rounded-xl p-6 flex items-center gap-4`}>
                        <div className={`${paymentBadge.bg} p-3 rounded-lg`}>
                            <CreditCard className={`w-8 h-8 ${paymentBadge.text}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Status Pembayaran</p>
                            <p className={`text-2xl font-bold ${paymentBadge.text}`}>
                                {order.payment_status.replace('_', ' ').toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Information Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Informasi Pemesan</h2>
                        <p className="text-indigo-100">Detail lengkap pemesanan resort</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Guest Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <User className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Building2 className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Institusi</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.institution}</p>
                                    </div>
                                </div>

                                {order.position && (
                                    <div className="flex items-start gap-3">
                                        <User className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Jabatan</p>
                                            <p className="text-lg font-semibold text-gray-900">{order.position}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <Phone className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Nomor Telepon</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.phone_number}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Alamat</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Jumlah Peserta</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.participants_count} orang</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Dibuat oleh</p>
                                        <p className="text-lg font-semibold text-gray-900">{order.user.name}</p>
                                        <p className="text-sm text-gray-600">{order.user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Detail Pemesanan</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-6 h-6 text-green-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Check-in</p>
                                            <p className="text-lg font-semibold text-gray-900">{formatDate(order.check_in)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-6 h-6 text-red-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Check-out</p>
                                            <p className="text-lg font-semibold text-gray-900">{formatDate(order.check_out)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Durasi Menginap</p>
                                            <p className="text-lg font-semibold text-gray-900">{order.days_count} hari</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Resort</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {order.resorts.map(r => r.name).join(", ")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Bed className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Kamar ({order.rooms_count})</p>
                                            <div className="space-y-1 mt-1">
                                                {order.rooms.map((room, index) => (
                                                    <p key={room.id} className="text-lg font-semibold text-gray-900">
                                                        {index + 1}. {room.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Pembayaran</h3>
                            
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Total Harga</span>
                                    <span className="text-2xl font-bold text-indigo-600">{formatCurrency(order.total_price)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Jumlah Dibayar</span>
                                    <span className="text-2xl font-bold text-green-600">{formatCurrency(order.payment_amount)}</span>
                                </div>
                                {order.total_price > order.payment_amount && (
                                    <div className="flex justify-between items-center pt-4 border-t border-indigo-200">
                                        <span className="text-gray-700 font-medium">Sisa Pembayaran</span>
                                        <span className="text-2xl font-bold text-red-600">
                                            {formatCurrency(order.total_price - order.payment_amount)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium">Dibuat pada:</p>
                                    <p>{formatDate(order.created_at)}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Terakhir diupdate:</p>
                                    <p>{formatDate(order.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}