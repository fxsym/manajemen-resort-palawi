import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHotel } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
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
          className="fixed top-0 left-0 z-50 w-full h-screen bg-background flex flex-col shadow-lg md:w-60 md:relative"
        >
          {/* Header Close Button */}
          <div className="flex justify-end p-4">
            <IoClose
              size={32}
              onClick={onClose}
              className="cursor-pointer hover:text-red-500 transition-colors duration-300"
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4 p-6 text-lg font-semibold">
            <Link href='/dashboard' className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <TbLayoutDashboard size={24} />
              <p>Beranda</p>
            </Link>
            <Link href='/resorts' className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <FaHotel size={24} />
              <p>Resort</p>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}