import { useState } from "react";
import Navmenu from "./Navmenu";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <section className="flex">
            <Navmenu isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="w-full transition-all duration-500">
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <main className="py-4 px-6 md:py-12 md:px-20">
                    {children}
                </main>
            </div>
        </section>
    )
}