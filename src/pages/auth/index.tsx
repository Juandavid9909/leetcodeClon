import { auth } from "@/firebase/firebase";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";

const AuthPage = () => {
    const router = useRouter();
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if(user) {
            router.push("/");
        }

        if(!loading && !user) {
            setPageLoading(false);
        }
    }, [user, router, loading]);

    if(pageLoading) {
        return null;
    }

    return (
        <div className="bg-neutral-200 h-screen relative">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                { authModal.isOpen && <AuthModal /> }
            </div>
        </div>
    );
}

export default AuthPage;