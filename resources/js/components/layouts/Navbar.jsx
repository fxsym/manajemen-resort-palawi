import { FiMenu } from "react-icons/fi";

export default function Navbar({ name, image_url, showSidebar, setShowSidebar }) {
  return (
    <nav className="flex justify-between items-center py-3 px-6 bg-primary transition-all duration-500">
      {/* Tombol sidebar */}
      <FiMenu
        size={30}
        onClick={() => setShowSidebar(!showSidebar)}
        className="hover:text-secondary cursor-pointer"
      />

      {/* Profil */}
      <div className="flex items-center gap-4">
        <span className="font-bold">{name}</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
          <img src={image_url} alt="Foto Profil" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}
