import { useState } from "react"
import { Link, router } from "@inertiajs/react"
import { Search, Calendar, Users, Phone, Building2, CreditCard, CheckCircle, Eye, Loader2 } from "lucide-react"
import MainLayout from "../../components/layouts/MainLayout"
import axios from "axios"

export default function Index() {
    const [searchType, setSearchType] = useState("name-date") // "name-date" or "month"
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [searchData, setSearchData] = useState({
        name: "",
        check_in: "",
        month: "",
    })

    const handleSearch = async () => {
        setLoading(true);

        const endpoint =
            searchType === "name-date"
                ? "/orders/search-by-name-date"
                : "/orders/search-by-month";

        const payload =
            searchType === "name-date"
                ? { name: searchData.name, check_in: searchData.check_in }
                : { month: searchData.month };

        try {
            const res = await axios.post(endpoint, payload);
            setOrders(res.data.data ?? []);
        } catch (error) {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = (orderId) => {
        router.visit(`/orders/${orderId}`)
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            reserved: "bg-blue-100 text-blue-800 border-blue-200",
            checked_in: "bg-green-100 text-green-800 border-green-200",
            checked_out: "bg-purple-100 text-purple-800 border-purple-200",
            cancelled: "bg-red-100 text-red-800 border-red-200",
            completed: "bg-gray-100 text-gray-800 border-gray-200",
        }
        return statusConfig[status] || "bg-gray-100 text-gray-800"
    }

    const getPaymentBadge = (status) => {
        const statusConfig = {
            unpaid: "bg-red-100 text-red-800 border-red-200",
            down_payment: "bg-orange-100 text-orange-800 border-orange-200",
            paid: "bg-green-100 text-green-800 border-green-200",
        }
        return statusConfig[status] || "bg-gray-100 text-gray-800"
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
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

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Cari Booking Resort
                    </h1>
                    <p className="text-lg text-gray-600">
                        Temukan data pemesanan berdasarkan nama & tanggal atau bulan tertentu
                    </p>
                </div>

                {/* Search Type Toggle */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setSearchType("name-date")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${searchType === "name-date"
                            ? "bg-indigo-600 text-white shadow-lg scale-105"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            Nama & Tanggal
                        </div>
                    </button>
                    <button
                        onClick={() => setSearchType("month")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${searchType === "month"
                            ? "bg-indigo-600 text-white shadow-lg scale-105"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Bulan
                        </div>
                    </button>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="space-y-6">
                        {searchType === "name-date" ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Pemesan
                                    </label>
                                    <input
                                        type="text"
                                        value={searchData.name}
                                        onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Masukkan nama pemesan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tanggal Check-in
                                    </label>
                                    <input
                                        type="date"
                                        value={searchData.check_in}
                                        onChange={(e) => setSearchData({ ...searchData, check_in: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pilih Bulan
                                </label>
                                <input
                                    type="month"
                                    value={searchData.month}
                                    onChange={(e) => setSearchData({ ...searchData, month: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Mencari...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Cari Booking
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results */}
                {orders.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Hasil Pencarian
                            </h2>
                            <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">
                                {orders.length} booking ditemukan
                            </span>
                        </div>

                        {searchType === "name-date" ? (
                            // Card View for Name & Date Search
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-1">{order.name}</h3>
                                            <p className="text-indigo-100 text-sm">{order.institution}</p>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Telepon</p>
                                                    <p className="font-semibold text-gray-900">{order.phone_number}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Peserta</p>
                                                    <p className="font-semibold text-gray-900">{order.participants_count} orang</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Check-in</p>
                                                    <p className="font-semibold text-gray-900 text-sm">{formatDate(order.check_in)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Check-out</p>
                                                    <p className="font-semibold text-gray-900 text-sm">{formatDate(order.check_out)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Resort</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {order.resorts?.map(r => r.name).join(", ") || "-"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Total Harga</p>
                                                    <p className="font-bold text-lg text-indigo-600">{formatCurrency(order.total_price)}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 pt-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentBadge(order.payment_status)}`}>
                                                    {order.payment_status.replace('_', ' ').toUpperCase()}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                                                    {order.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>

                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                                            >
                                                <Eye className="w-5 h-5" />
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Table View for Month Search
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Institusi</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Telepon</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Check-in</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Check-out</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Resort</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Kamar</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Pembayaran</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {orders.map((order, index) => (
                                                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">{order.name}</td>
                                                    <td className="px-6 py-4 text-gray-700">{order.institution}</td>
                                                    <td className="px-6 py-4 text-gray-700">{order.phone_number}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(order.check_in)}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(order.check_out)}</td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {order.resorts?.map(r => r.name).join(", ") || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {order.rooms?.map(r => r.name).join(", ") || "-"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border inline-block ${getPaymentBadge(order.payment_status)}`}>
                                                            {order.payment_status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border inline-block ${getStatusBadge(order.status)}`}>
                                                            {order.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleViewDetail(order.id)}
                                                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 hover:underline"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!loading && orders.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Belum Ada Hasil Pencarian
                        </h3>
                        <p className="text-gray-600">
                            Silakan masukkan kriteria pencarian dan klik tombol "Cari Booking"
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}