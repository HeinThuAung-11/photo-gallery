import {signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {auth} from "../../utli/firebase";
import { useNavigate } from "react-router-dom";

import {FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import {useDispatch} from "react-redux";
import {login} from "../../features/user/userSlice";
export const Login = ()=>{
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate =useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log('user',user)
                let payload = {
                    userId: user.uid,
                    email:email
                }
                dispatch(login(payload))
                navigate('/')
                setError(null)
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    return(<div>
        <label htmlFor="my-modal-4" className="btn">Login</label>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer rounded-lg">
            <label className="modal-box relative max-w-[656px] max-h-[580px] px-7 py-10" htmlFor="">

                <div className='flex flex-col items-center'>
                    <h6 className={'mt-2 text-xl'}> Welcome to <span className={'text-[#facc15]'}>Gallerymojo.</span></h6>
                    <h2  className={'mt-3 text-2xl font-bold'}>Sign In</h2>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col items-center mt-3'>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-5 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-5 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                    />
                    <button type="submit" className='mt-5 h-[50px] w-full rounded-md border border-black text-sm text-gray-700 pl-6'>Sign In</button>
                    {error && <span className={'text-rose-600 mt-3'}>Wrong email or password!</span>}
                </form>
                <div className={'flex mt-4 w-[600px] items-center justify-evenly'}>
                    <div className={'border-t-2 border-gray-400 w-6/12'}></div>
                    <p className={'font-bold mx-2'}>OR</p>
                    <div className={'border-t-2 border-gray-400 w-6/12'}></div>
                </div>
                <div className={'flex items-center justify-evenly mt-4'}>
                    <div className={'w-[260px] h-[45px] border border-black ml-3 flex items-center justify-evenly cursor-pointer'}>
                        <button type={'button'}>
                            Sign In With Google
                        </button>
                        <AiOutlineGoogle size={'20px'}/>
                    </div>
                    <div className={'w-[260px] h-[45px] border border-black ml-3 flex items-center justify-evenly cursor-pointer'}>
                        <button type={'button'}>
                            Sign In With FaceBook
                        </button>
                        <FaFacebookF size={'20px'}/>
                    </div>
                </div>

                <p className={'text-center mt-4 cursor-pointer'}>Forgot your password ?</p>
            </label>
        </label>

    </div>)
}