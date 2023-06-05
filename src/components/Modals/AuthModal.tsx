import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

const AuthModal = () => {
    const authModal = useRecoilValue(authModalState);

    return (
        <div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>
            <div className='relative w-full h-full mx-auto flex items-center justify-center'>
                <div className='bg-white rounded-md shadow relative w-full mx-6'>
                    <div className='flex justify-center p-2'>
                        <Image alt="Leetcode logo" src="/leetcode-login.svg" width={ 50 } height={ 50 } className="mt-5 w-full h-20" />
                    </div>

                    { authModal.type === "login"
                        ? <Login />
                        : authModal.type === "register"
                        ? <Signup />
                        : <ResetPassword />
                    }
                </div>
            </div>
        </div>
    );
}

export default AuthModal;