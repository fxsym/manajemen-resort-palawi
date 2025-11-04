import { useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";

export default function Resort({ resort }) {

    useEffect(() => {
        console.log(resort)
    }, [])

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-4">{resort.name}</h1>
            <div className="flex gap-4">
                {resort.rooms.map(({ id, name, status }) => (
                    <div key={id} className={`${status == 'booked' ? 'bg-red-600' : 'bg-green-600'} p-4 rounded-lg `}>
                        <p>{name}</p>
                    </div>
                ))}
            </div>
        </MainLayout>
    )
}