export default function ResortHeaderCheckAvailability({stats, resort}) {
    return (
        <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                    {resort.name}
                </h3>
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
                        {stats.available} Tersedia
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    <p className="text-xs text-gray-600">Total Kamar</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-700">{stats.available}</p>
                    <p className="text-xs text-green-600">Tersedia</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
                    <p className="text-xs text-yellow-600">Pending</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-2xl font-bold text-red-700">{stats.unavailable}</p>
                    <p className="text-xs text-red-600">Tidak Tersedia</p>
                </div>
            </div>
        </div>
    )
}

