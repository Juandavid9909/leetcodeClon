import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: "login" }));
    }

    return (
        <div className="bg-white flex items-center justify-between sm:px-12 px-2 md:px-24">
            <Link href="/" className="flex items-center justify-center h-12">
                <Image src="/leetcode-black.svg" alt="Leetcode" width={ 200 } height={ 20 } className=" w-32 h-50" />
            </Link>

            <div className="flex items-center">
                <button
                    className="text-brand-orange bg-white border border-brand-orange px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:bg-brand-orange hover:text-white transition duration-300ms ease-in-out"
                    onClick={ handleClick }
                >Sign In</button>
            </div>
        </div>
    );
}

export default Navbar;