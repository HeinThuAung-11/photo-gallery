import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utli/firebase";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(false)
        await sendPasswordResetEmail(auth, email).then(() => {
            toast.success('Check Your Email To Reset Password!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return (
        <div>
            <p htmlFor="forgot" className="font-montserrat tracking-wide hover:opacity-80 underline mt-7 cursor-pointer text-center" onClick={() => setOpen(true)}>
                Forgot your password?
            </p>
            <input type="checkbox" id="forgot" className="modal-toggle" checked={open} readOnly={true} />
            <label htmlFor="forgot" className="modal cursor-pointer rounded-lg">

                <label className={`custom-bg-gradient modal-box font-montserrat relative max-w-[656px] px-7 py-10`} htmlFor="forgot">

                    <div className='flex flex-col items-center'>
                        <label htmlFor="forgot" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setOpen(false)}>✕</label>
                        <h2 className={'mt-3 text-2xl font-bold'}>Email Reset</h2>

                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col items-start mt-3'>
                        <p>Enter your email address:</p>
                        <input
                            required
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='mt-2 h-[50px] w-full border border-gray-700 bg-transparent text-sm text-gray-700 pl-6'
                        />

                        <button type="submit" htmlFor="forgot" className='loginBox hover:shadow-none hover:opacity-90 tracking-wider mt-5 h-[50px] w-full rounded-none text-sm pl-6 bg-gray900 text-gray100'>Submit</button>

                        {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}
                    </form>
                </label>
            </label>
        </div>
    )
}