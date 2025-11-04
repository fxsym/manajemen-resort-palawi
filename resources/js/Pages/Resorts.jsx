import { useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import CardResort from "../components/sections/resort/CardResort";

export default function Resorts({ resorts }) {

    useEffect(() => {
        console.log(resorts)
    }, [])

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-4">Pilih resort</h1>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-around">
                {resorts.length > 0 ? (
                    resorts.map(({ id, name, image_url }) => (
                        <CardResort key={id} name={name} image_url={image_url} />
                    ))
                ) : (
                    <p className="text-gray-500">Belum ada resort tersedia</p>
                )}
            </div>
        </MainLayout>
    )
}