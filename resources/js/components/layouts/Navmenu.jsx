import { Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOutIcon } from "lucide-react";
import { CgNotes } from "react-icons/cg";
import { FaHotel } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdHotel, MdOutlineLibraryBooks, MdRoomService } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";

export default function Navmenu({ isOpen, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="navmenu"
          initial={{ x: "-100%" }}   // posisi awal di kiri
          animate={{ x: 0 }}         // slide masuk
          exit={{ x: "-100%" }}      // slide keluar ke kiri lagi
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ backgroundColor: "#1E828F" }} // 🎨 warna kustom sidebar
          className="fixed top-0 left-0 z-50 w-full h-screen text-white flex flex-col shadow-lg md:w-75 md:relative"
        >
          {/* Header Close Button */}
          <div className="flex justify-end p-4">
            <IoClose
              size={32}
              onClick={onClose}
              className="cursor-pointer text-white hover:text-red-500 transition-colors duration-300"
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4 p-6 text-lg font-semibold">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
            >
              <TbLayoutDashboard size={24} />
              <p>Beranda</p>
            </Link>

            <Link
              href="/orders/create"
              className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
            >
              <FaHotel size={24} />
              <p>Booking Resort</p>
            </Link>

            <Link
              href="/check-availability"
              className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
            >
              <MdHotel size={24} />
              <p>Cek Ketersediaan Kamar</p>
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
            >
              <CgNotes size={24} />
              <p>Kelola Booking Resort</p>
            </Link>

            <button
              onClick={() => router.post("/logout")}
              className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
            >
              <LogOutIcon size={24} />
              <p>Logout</p>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
