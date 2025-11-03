import Navbar from "../components/layouts/Navbar";

export default function Dashboard ({user}) {
    return (
        <section>
            <Navbar name={user.name} image_url={user.image_url}/>
            <p>Haloo {user.name}, Selamat datang</p>
        </section>
    )
}