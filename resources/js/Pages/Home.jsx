import FormLogin from "../components/sections/home/FormLogin";

export default function Home() {
    return (
        <section className="relative h-screen w-full overflow-hidden" id="home">
            {/* Background image dengan efek zoom */}
            <div className="absolute inset-0">
                <img
                    src="/images/heroImage.jpg"
                    alt="Hero"
                    className="w-full h-full object-cover transition-transform duration-200 ease-out"
                />

                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col gap-4 items-center justify-center text-center">
                <h1 className="text-4xl text-white font-bold">Website Manajemen Resort Palawi</h1>
                <FormLogin />
            </div>
        </section>
    );
}
