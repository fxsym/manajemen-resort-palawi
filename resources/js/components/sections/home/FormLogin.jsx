import { useForm } from "@inertiajs/react"

export default function FormLogin() {
    const { data, setData, post, processing, errors } = useForm({
        userInput: "",
        password: "",
        remember: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-2xl backdrop-blur-sm shadow-2xl text-primary items-center">
            <div className="w-20 h-20 md:w-30 md:h-30 bg-white rounded-full p-2">
                <img
                    src="/images/logoEconique.png"
                    alt="Logo Econique"
                />
            </div>
            
            <input
                type="text"
                value={data.userInput}
                placeholder="Masukan username/email"
                className="md:w-120 border-primary border-2 p-2 rounded-xl"
                onChange={e => setData("userInput", e.target.value)}
            />
            {errors.userInput && (
                <div className="text-red-500 text-sm">{errors.userInput}</div>
            )}

            <input
                type="password"
                value={data.password}
                placeholder="Masukan password"
                className="md:w-120 border-primary border-2 p-2 rounded-xl"
                onChange={e => setData("password", e.target.value)}
            />
            {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <label className="flex items-center space-x-2 text-sm">
                <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                />
                <span>Ingat saya</span>
            </label>

            {errors.message && (
                <div className="text-red-500 text-sm">{errors.message}</div>
            )}

            <button
                type="submit"
                className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 cursor-pointer focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors shadow-sm"
            >
                {processing ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}