import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const success = await sendPasswordResetEmail(email);

        if(success) {
            toast.success("Password reset email sent", { position: "top-center", autoClose: 3000 });
        }
    }

    useEffect(() => {
        if(error) {
            toast.error(error.message);
        }
    }, [error]);

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={ handleReset }>
            <p className="text-gray-400 text-sm mt-5">Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you to reset it.</p>

            <div className="focus-within:shadow-md transition duration-500">
                <input
                    onChange={ (e) => setEmail(e.target.value) }
                    type="email"
                    name="email"
                    id="email"
                    className="border outline-none sm:text-sm focus:border-black hover:border-black block w-full p-2.5 mt-8 rounded-sm transition duration-500 authInput"
                    placeholder="E-mail"
                />
            </div>

            <button
                type="submit"
                className="w-full text-white p-2 rounded-sm btnAuth"
            >{ sending ? "Sending..." : "Reset Password" }</button>
        </form>
    );
}

export default ResetPassword;