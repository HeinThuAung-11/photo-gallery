import { sendPasswordResetEmail } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../utli/firebase";
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaWrench } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllData, login, userInfo, userSlice } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../utli/Auth";
export const ForgotPassword = ({ setLoginOpen }) => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [open, setopen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginOpen(false)
        await sendPasswordResetEmail(auth, email).then(() => {
            console.log("Password reset email sent", email)

        })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return (
        <div>
            <p htmlFor="forgot" className="font-montserrat tracking-wide hover:opacity-80 underline mt-7 cursor-pointer text-center" onClick={() => setopen(true)}>
                Forgot your password?
            </p>
            <input type="checkbox" id="forgot" className="modal-toggle" checked={open} readOnly={true} />
            <label htmlFor="forgot" className="modal cursor-pointer rounded-lg">

                <label className={`custom-bg-gradient modal-box font-montserrat relative max-w-[656px] px-7 py-10`} htmlFor="forgot">

                    <div className='flex flex-col items-center'>

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

                        <button type="submit" htmlFor="forgot" className='loginBox hover:shadow-none hover:opacity-90 tracking-wider mt-5 h-[50px] w-full rounded-none text-sm pl-6 bg-gray900 text-gray100' onClick={() => setopen(false)}>Submit</button>

                        {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}
                    </form>
                </label>
            </label>
        </div>
    )
}