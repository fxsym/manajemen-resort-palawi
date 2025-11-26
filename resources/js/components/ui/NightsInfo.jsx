export default function NightsInfo({ nights }) {
    return (
        <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#1E828F]/10 text-[#1E828F] px-6 py-3 rounded-full font-semibold">
                <svg
                    className="w-5 h-5 text-[#1E828F]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
                {nights} malam menginap
            </div>
        </div>
    )
}