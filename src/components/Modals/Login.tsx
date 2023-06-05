import { auth } from '@/firebase/firebase';
import { authModalState } from '@/atoms/authModalAtom';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';

const Login = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    }
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!inputs.email || !inputs.password) {
            return toast.error("Please fill all fields", { position: "top-center", autoClose: 3000 });
        }

        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if(!newUser) {
                return;
            }

            router.push("/");
        } catch (error: any) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 });
        }
    }

    useEffect(() => {
        if(error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 });
        }
    }, [error]);

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={ handleLogin }>
            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ handleInputChange }
                    type="email"
                    name="email"
                    id="email"
                    className="border outline-none sm:text-sm focus:border-black hover:border-black block w-full p-2.5 mt-8 rounded-sm transition duration-500 authInput"
                    placeholder="E-mail"
                />
            </div>

            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ handleInputChange }
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
            >{ loading ? "Loading..." : "Sign In" }</button>

            <div className="flex justify-between mt-2 text-sm text-light-button">
                <a href="#" onClick={ () => handleClick("forgotPassword") }>Forgot Password?</a>

                <a href="#" onClick={ () => handleClick("register") }>Sign Up</a>
            </div>
        </form>
    );
}

export default Login;