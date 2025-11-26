// Fungsi untuk mendapatkan styling berdasarkan status
export function getRoomStatusStyle(status) {
  switch (status) {
    case "available": // HIJAU - Tersedia
      return "bg-gradient-to-br from-green-500 to-emerald-700 text-white cursor-pointer hover:scale-105";
    case "pending": // KUNING - Menunggu Konfirmasi
      return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white cursor-pointer opacity-80 hover:scale-105";
    case "unavailable": // MERAH - Tidak Tersedia
      return "bg-gradient-to-br from-red-600 to-red-900 text-white cursor-pointer opacity-75 hover:scale-105";
    default:
      return "bg-gradient-to-br from-gray-400 to-gray-600 text-white";
  }
}

// Fungsi untuk mendapatkan icon status
export function getRoomStatusIcon(status) {
  switch (status) {
    case "available":
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "pending":
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "unavailable":
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}

// Fungsi untuk mendapatkan text status
export function getRoomStatusText(status) {
  switch (status) {
    case "available":
      return "Tersedia";
    case "pending":
      return "Menunggu Konfirmasi";
    case "unavailable":
      return "Tidak Tersedia";
    default:
      return "Unknown";
  }
}
