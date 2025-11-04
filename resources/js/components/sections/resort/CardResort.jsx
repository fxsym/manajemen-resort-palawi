import { Link } from "@inertiajs/react";

export default function CardResort({id, name, image_url }) {
  return (
    <Link href={`/resorts/${id}`} className="relative w-full max-w-sm h-96 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Layer gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] w-full z-10 bg-gradient-to-t from-black/90 to-transparent opacity-100 group-hover:opacity-10 transition-opacity duration-500"></div>

      {/* Gambar Resort */}
      <img
        src={image_url}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Teks di bawah */}
      <div className="absolute inset-x-0 bottom-0 pb-4 pl-6 z-20">
        <h3 className="text-white text-lg font-semibold drop-shadow-md">
          {name}
        </h3>
      </div>
    </Link>
  );
}
