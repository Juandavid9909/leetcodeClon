import { auth, firestore } from '@/firebase/firebase';
import { authModalState } from '@/atoms/authModalAtom';
import { toast } from 'react-toastify';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    }

    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!inputs.email || !inputs.password || !inputs.displayName) {
            return toast.error("Please fill all fields", { position: "top-center", autoClose: 3000 });
        }

        try {
            toast.loading("Creating your account...", { position: "top-center", toastId: "loadingToast" });
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if(!newUser) {
                return;
            }

            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: []
            }

            await setDoc(doc(firestore, "users", newUser.user.uid), userData);

            router.push("/");
        } catch (error: any) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 });
        } finally {
            toast.dismiss("loadingToast");
        }
    }

    useEffect(() => {
        if(error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 });
        }
    }, [error]);

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={ handleRegister }>
            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ handleChangeInput }
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="border outline-none sm:text-sm focus:border-black hover:border-black block w-full p-2.5 mt-8 rounded-sm transition duration-500 authInput"
                    placeholder="Username"
                />
            </div>

            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ handleChangeInput }
                    type="email"
                    name="email"
                    id="email"
                    className="border outline-none sm:text-sm focus:border-black hover:border-black block w-full p-2.5 mt-8 rounded-sm transition duration-500 authInput"
                    placeholder="E-mail"
                />
            </div>

            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ handleChangeInput }
                    type="password"
                    name="password"
                    id="password"
                    className="border outline-none sm:text-sm focus:border-black hover:border-black block w-full p-2.5 rounded-sm transition duration-500 authInput"
                    placeholder="Password"
                />
            </div>

            <button
                type="submit"
                className="w-full text-white p-2 rounded-sm btnAuth"
            >{ loading ? "Registering..." : "Sign Up" }</button>

            <div className="flex justify-center mt-2 text-sm">
                    <p className="text-gray-400">Have an account? <a href="#" className="text-light-button ml-1" onClick={ () => handleClick("login") }>Sign In</a></p>

                    
            </div>
        </form>
    );
}

export default Signup;