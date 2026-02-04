import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
    return(
        <nav className="flex items-center justify-between px-16 py-4" style={{ backgroundColor: 'lab(97.1626% 2.99937 -4.13398)' }}>
            <div className="flex items-center gap-12">
                <Image src="/brand-logo.png" alt="BIXBEE Logo" width={100} height={100} />
               
            </div>
            <Link href="/login">
            <button className="px-5 py-3 text-black bg-white border-2 border-black rounded-2xl font-cursive font-bold hover:bg-black hover:text-white transition duration-200">
                Connect
            </button>
            </Link>
        </nav>
    );
}