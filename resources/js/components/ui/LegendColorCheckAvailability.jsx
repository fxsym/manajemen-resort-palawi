export default function LegendColorCheckAvailability() {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-4 text-lg">
                Keterangan Status Kamar:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-green-800">Tersedia</p>
                        <p className="text-sm text-green-600">Dapat dipesan & diklik untuk detail</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-yellow-800">Menunggu Konfirmasi</p>
                        <p className="text-sm text-yellow-600">Status: Pending</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-red-800">Tidak Tersedia</p>
                        <p className="text-sm text-red-600">Reserved atau Checked-In</p>
                    </div>
                </div>
            </div>
        </div>
    )
}