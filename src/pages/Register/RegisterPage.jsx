import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth, db } from "../../utli/firebase";
import { setDoc, doc } from 'firebase/firestore'
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllData, login } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { GenerateAvatar } from "../UserProfile/GenerateAvatar";
import {toast} from "react-toastify";
export const RegisterPage = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setError(null)
        if (validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    let payload = {
                        userId: res.user.uid,
                        email: res.user.email
                    }
                    dispatch(login(payload))

                    const avatar = GenerateAvatar(res.user.uid);
                    avatar.then(response => setDoc(doc(db, 'users', res.user.uid), {
                        favourite_photo_id: [],
                        favourite_video_id: [],
                        username: username,
                        userPhoto: response,
                    }))
                    setError(null)
                    dispatch(login(payload))
                    toast.success('Account Created Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate('/userprofile')
                    }, 2000)
                })
                .catch((error) => {
                    setError(error.message);
                });
        }

    }
    return (
        <div className={'max-w-[656px] max-h-[650px] px-7 py-10 bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] mx-auto mt-10 rounded-md'}>

                <div className='flex flex-col items-center'>
                    <h6 className={'mt-2 text-xl'}> Welcome to <span className={'text-[#facc15]'}>Gallerymojo.</span></h6>
                    <h2 className={'mt-3 text-2xl font-bold'}>Sign Up</h2>
                    <p className={'mt-3'}>Sign up to explore and download from gallerymojo.</p>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col items-center mt-3'>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className='mt-5 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-9 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-9 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='mt-9 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <button type="submit" className='mt-9 h-[50px] w-full rounded-md border border-black text-sm text-gray-700 pl-6'>Sign Up</button>
                    {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}
                </form>
    </div>)
}