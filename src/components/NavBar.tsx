import Image from "next/image";

export default function NavBar() {
    return(
        <nav className="flex items-center justify-between px-16 py-4">
            <div className="flex items-center gap-12">
                <Image src="/brand-logo.png" alt="BIXBEE Logo" width={100} height={100} />
               
            </div>
            <button className="px-5 py-3 text-black bg-white border-2 border-black rounded-2xl font-cursive font-bold hover:bg-black hover:text-white transition duration-300">
                Connect
            </button>
        </nav>
    );
}