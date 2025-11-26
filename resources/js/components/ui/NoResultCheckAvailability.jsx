export default function NoResultCheckAvailability({setCheckIn, setCheckOut, setHasSearched, setResortsWithStatus}) {
    return (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
                <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Tidak Ada Kamar Ditemukan
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
                Silakan coba lagi dengan tanggal yang berbeda.
            </p>
            <button
                onClick={() => {
                    setCheckIn("");
                    setCheckOut("");
                    setHasSearched(false);
                    setResortsWithStatus([]);
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
                Cari Tanggal Lain
            </button>
        </div>
    )
}