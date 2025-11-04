import { useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";

export default function Resorts({resorts}) {

    useEffect(() => {
        console.log(resorts)
    }, [])

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-4">Pilih resort</h1>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-around">

            </div>
        </MainLayout>
    )
}