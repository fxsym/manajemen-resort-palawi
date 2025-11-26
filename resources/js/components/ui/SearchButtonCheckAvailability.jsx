export default function SearchButtonCheckAvailability({handleCheckAvailability, loading}) {
    return (
        <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm uppercase tracking-wide opacity-0">
                Action
            </label>
            <button
                onClick={handleCheckAvailability}
                disabled={loading}
                className={`w-full bg-[#1E828F] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#176672] transform hover:scale-105 transition-all shadow-lg hover:shadow-xl ${loading ? "opacity-60 cursor-not-allowed scale-100" : ""
                    }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5"
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
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Memeriksa...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        Cek Ketersediaan
                    </span>
                )}
            </button>
        </div>
    )
}