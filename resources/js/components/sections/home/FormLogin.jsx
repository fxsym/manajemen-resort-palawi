export default function FormLogin() {
    return (
        <form action="" className="flex flex-col gap-4 p-6 rounded-2xl backdrop-blur-sm shadow-2xl text-primary items-center">
            <div className="w-20 h-20 md:w-30 md:h-30 bg-white rounded-full p-2">
                <img
                    src="/images/logoEconique.png"
                    alt="Logo Econique"
                />
            </div>
            <input type="text" placeholder="Masukan username/email" className="md:w-120 border-primary border-2 p-2 rounded-xl" />
            <input type="text" placeholder="Masukan password" className="md:w-120 border-primary border-2 p-2 rounded-xl" />
            <button
                type="submit"
                className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 cursor-pointer focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors shadow-sm"
            >
                Login
            </button>
        </form>
    )
}