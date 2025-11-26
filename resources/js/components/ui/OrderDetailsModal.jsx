import { useState } from "react";
import { X, User, Calendar, MapPin, Phone, Users, Home, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderDetailsModal({ isOpen, onClose, orderDetails, roomName }) {
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

    if (!isOpen || !orderDetails) return null;

    // Pastikan orderDetails adalah array
    const orders = Array.isArray(orderDetails) ? orderDetails : [orderDetails];
    const currentOrder = orders[currentOrderIndex];
    const hasMultipleOrders = orders.length > 1;

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            reserved: 'bg-blue-100 text-blue-800 border-blue-300',
            checked_in: 'bg-green-100 text-green-800 border-green-300',
            checked_out: 'bg-gray-100 text-gray-800 border-gray-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300',
            completed: 'bg-purple-100 text-purple-800 border-purple-300',
        };

        const statusLabels = {
            pending: 'Menunggu',
            reserved: 'Dipesan',
            checked_in: 'Check-In',
            checked_out: 'Check-Out',
            cancelled: 'Dibatalkan',
            completed: 'Selesai',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
                {statusLabels[status] || status}
            </span>
        );
    };

    const handlePrevOrder = () => {
        setCurrentOrderIndex((prev) => (prev > 0 ? prev - 1 : orders.length - 1));
    };

    const handleNextOrder = () => {
        setCurrentOrderIndex((prev) => (prev < orders.length - 1 ? prev + 1 : 0));
    };

    const handleCloseModal = () => {
        setCurrentOrderIndex(0); // Reset index saat tutup
        onClose();
    };

    const getPaymentStatusBadge = (status, amount) => {
        const baseStyle = "px-3 py-1 rounded-full text-xs font-semibold border";

        if (status === "unpaid") {
            return (
                <span className={`${baseStyle} bg-yellow-100 text-yellow-800 border-yellow-300`}>
                    Belum DP
                </span>
            );
        }

        if (status === "down_payment") {
            return (
                <span className={`${baseStyle} bg-green-100 text-green-800 border-green-300`}>
                    Bayar DP: {formatCurrency(amount)}
                </span>
            );
        }

        if (status === "paid") {
            return (
                <span className={`${baseStyle} bg-green-100 text-green-800 border-green-300`}>
                    Sudah bayar lunas
                </span>
            );
        }

        return (
            <span className={`${baseStyle} bg-gray-100 text-gray-800 border-gray-300`}>
                {status}
            </span>
        );
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={handleCloseModal}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-[#1E828F] to-[#16a5b8] text-white p-6 rounded-t-2xl z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Detail Pemesanan</h2>
                                <p className="text-white/90 text-sm">
                                    Kamar: <span className="font-semibold">{roomName}</span>
                                </p>
                                {hasMultipleOrders && (
                                    <p className="text-white/80 text-xs mt-1">
                                        Menampilkan {currentOrderIndex + 1} dari {orders.length} pemesanan
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation untuk multiple orders */}
                        {hasMultipleOrders && (
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <button
                                    onClick={handlePrevOrder}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Previous order"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-2">
                                    {orders.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentOrderIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentOrderIndex
                                                ? 'bg-white w-6'
                                                : 'bg-white/50 hover:bg-white/70'
                                                }`}
                                            aria-label={`Go to order ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextOrder}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Next order"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Order ID & Status */}
                        <div className="flex items-center justify-between pb-4 border-b">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Order ID</p>
                                <p className="font-mono font-semibold text-gray-700">#{currentOrder.id}</p>
                            </div>
                            {getStatusBadge(currentOrder.status)}
                        </div>

                        {/* Customer Info */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-[#1E828F]" />
                                Informasi Pemesan
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                                    <p className="font-semibold text-gray-800">{currentOrder.name}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Institusi</p>
                                    <p className="font-semibold text-gray-800">{currentOrder.institution}</p>
                                </div>

                                {currentOrder.position && (
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Jabatan</p>
                                        <p className="font-semibold text-gray-800">{currentOrder.position}</p>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Phone className="w-4 h-4" />
                                        Nomor Telepon
                                    </p>
                                    <p className="font-semibold text-gray-800">{currentOrder.phone_number}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    Alamat
                                </p>
                                <p className="font-semibold text-gray-800">{currentOrder.address}</p>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#1E828F]" />
                                Detail Pemesanan
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                    <p className="text-sm text-blue-600 mb-1">Check-In</p>
                                    <p className="font-bold text-blue-900">{formatDate(currentOrder.check_in)}</p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                    <p className="text-sm text-purple-600 mb-1">Check-Out</p>
                                    <p className="font-bold text-purple-900">{formatDate(currentOrder.check_out)}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        Jumlah Peserta
                                    </p>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {currentOrder.participants_count} orang
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Home className="w-4 h-4" />
                                        Jumlah Kamar
                                    </p>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {currentOrder.rooms_count} kamar
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Lama Menginap
                                    </p>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {currentOrder.days_count} hari
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-gradient-to-r from-[#1E828F]/10 to-[#16a5b8]/10 p-4 rounded-xl border-2 border-[#1E828F]/20">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-[#1E828F]" />
                                    Total Harga
                                </span>
                                <span className="text-2xl font-bold text-[#1E828F]">
                                    {formatCurrency(currentOrder.total_price)}
                                </span>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="bg-gradient-to-r from-[#1E828F]/10 to-[#16a5b8]/10 p-4 rounded-xl border-2 border-[#1E828F]/20">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium flex items-center gap-2">
                                    Status Pembayaran
                                </span>
                                {getPaymentStatusBadge(currentOrder.payment_status, currentOrder.payment_amount)}
                            </div>
                        </div>


                        {/* User Info (if available)
            {currentOrder.user && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Akun Pemesan</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Email: <span className="font-medium text-gray-800">{currentOrder.user.email}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    User ID: <span className="font-medium text-gray-800">#{currentOrder.user.id}</span>
                  </p>
                </div>
              </div>
            )} */}

                        {/* Warning jika ada multiple orders */}
                        {hasMultipleOrders && (
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-amber-800">
                                            <span className="font-semibold">Perhatian:</span> Kamar ini memiliki {orders.length} pemesanan dalam rentang tanggal yang Anda cari. Gunakan tombol navigasi untuk melihat detail setiap pemesanan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
                        <button
                            onClick={handleCloseModal}
                            className="w-full bg-[#1E828F] hover:bg-[#16a5b8] text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}