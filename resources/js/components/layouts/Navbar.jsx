import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ showSidebar, setShowSidebar }) {
  const { props } = usePage()
  const auth = props.auth

  useEffect(() => {
    console.log(auth)
  }, [])

  return (
    <nav className="flex justify-between items-center py-3 px-6 bg-background transition-all duration-500">
      {/* Tombol sidebar */}
      <FiMenu
        size={30}
        onClick={() => setShowSidebar(!showSidebar)}
        className="hover:text-primary cursor-pointer"
      />

      {/* Profil */}
      <div className="flex items-center gap-4">
        {auth.user ? (
          <>
            <span className="font-bold">{auth.user.name}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <img src={auth.user.image_url} alt="Foto Profil" className="w-full h-full object-cover" />
            </div>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>

    </nav>
  );
}
