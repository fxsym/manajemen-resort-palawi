import { Link } from "@inertiajs/react";
import MainLayout from "../components/layouts/MainLayout";

export default function RoomDetail({ room }) {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/check-availability"
            className="inline-flex items-center gap-2 text-[#1E828F] hover:text-[#176672] font-semibold mb-6 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Pencarian
          </Link>

          {/* Room Detail Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#1E828F] to-[#176672] text-white p-8">
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <h1 className="text-4xl font-bold">{room.name}</h1>
              </div>
              <p className="text-blue-100 text-lg">
                {room.resort?.name || "Resort"}
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Room Image Placeholder */}
              <div className="mb-8">
                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-24 h-24 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500 font-medium">
                      Foto Kamar {room.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Room Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Basic Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Informasi Kamar
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#1E828F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#1E828F]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Nomor Kamar
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {room.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#1E828F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#1E828F]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Resort
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {room.resort?.name || "-"}
                        </p>
                      </div>
                    </div>

                    {room.price && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#1E828F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-[#1E828F]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Harga per Malam
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            Rp {room.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Facilities */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Fasilitas Kamar
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "wifi", label: "WiFi Gratis" },
                      { icon: "tv", label: "TV Kabel" },
                      { icon: "ac", label: "AC" },
                      { icon: "bath", label: "Kamar Mandi" },
                      { icon: "bed", label: "Tempat Tidur" },
                      { icon: "towel", label: "Handuk" },
                    ].map((facility, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-[#1E828F] rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {facility.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Deskripsi
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {room.description ||
                    `Kamar ${room.name} di ${
                      room.resort?.name || "resort kami"
                    } menawarkan kenyamanan maksimal untuk pengalaman menginap Anda. Dilengkapi dengan berbagai fasilitas modern dan pemandangan yang menakjubkan, kamar ini cocok untuk liburan keluarga maupun perjalanan bisnis Anda.`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href="/orders/create"
                  className="flex-1 bg-[#1E828F] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#176672] transform hover:scale-105 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Pesan Kamar Ini
                </Link>
                <Link
                  href={`/resort/${room.resort?.id || ""}`}
                  className="flex-1 bg-white border-2 border-[#1E828F] text-[#1E828F] font-bold py-4 px-6 rounded-xl hover:bg-[#1E828F]/5 transform hover:scale-105 transition-all text-center"
                >
                  Lihat Resort
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}