import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Navmenu from "../components/layouts/Navmenu";

export default function Dashboard({ user }) {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <section className="flex">
            <Navmenu isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="w-full transition-all duration-500">
                <Navbar name={user.name} image_url={user.image_url} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>
            </div>
        </section>
    )
}