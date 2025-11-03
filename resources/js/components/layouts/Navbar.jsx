import { FiMenu } from "react-icons/fi";

export default function Navbar({ name, image_url }) {
    return (
        <nav className="fixed flex justify-between items-center w-full py-2 px-6 bg-primary">
            <div>
                <FiMenu size={40} />
            </div>

            <div className="flex items-center gap-4">
                <div className="font-bold">{name}</div>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                    <img
                        src={image_url}
                        alt="Foto Profil"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </nav>
    )
}