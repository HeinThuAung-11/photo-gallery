import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAdditionalUserInfo
} from 'firebase/auth'
import { useContext, useState } from "react";
import { auth, db } from "../../utli/firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from 'firebase/firestore';

import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { getAllData, login } from "../../features/user/userSlice";
import { GenerateAvatar } from '../User-Profile/GenerateAvatar';

export const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log('user', user)
                let payload = {
                    userId: user.uid,
                    email: email
                }
                dispatch(login(payload))
                setError(null)
                navigate('/userprofile')
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                let payload = {
                    userId: user.uid,
                    email: user.email
                }
                const isNew = getAdditionalUserInfo(result);
                console.log('Is new', isNew)
                if (isNew.isNewUser) {
                    const avatar = GenerateAvatar(user.uid);
                    avatar.then(response => setDoc(doc(db, 'users', user.uid), {
                        favourite_photo_id: [],
                        favourite_video_id: [],
                        username: user.displayName,
                        userPhoto: response,
                    }))
                }
                dispatch(login(payload))
                setError(null)
                setTimeout(() => {
                    navigate('/userprofile')
                }, 3000)
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((response) => {
                // The signed-in user info.
                console.log("FACEBOOK LOgin",)
                const isNew = getAdditionalUserInfo(response);
                console.log('Is new', isNew)
                const { uid, email, displayName } = response.user;
                if (isNew.isNewUser) {
                    const avatar = GenerateAvatar(uid);
                    avatar.then(response => setDoc(doc(db, 'users', uid), {
                        favourite_photo_id: [],
                        favourite_video_id: [],
                        username: displayName,
                        userPhoto: response,
                    }))
                }
                console.log("keep goingh")
                let payload = {
                    userId: uid,
                    email: email
                }
                dispatch(login(payload))
                setError(null)
                setTimeout(() => {
                    navigate('/userprofile')
                }, 3000)
            }).catch((error) => {
                setError(error.message);
            });
    }
    return (<>
        <label htmlFor="my-modal-4" className='ml-4 font-montserrat text-sm lg:text-base font-medium bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] w-[6rem] h-[2.5rem] lg:w-[9rem] lg:h-[3rem] hover:drop-shadow-lg flex items-center justify-center cursor-pointer'>
            Join Now
        </label>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer rounded-lg">
            <label className="modal-box relative max-w-[656px] max-h-[580px] px-7 py-10 bg-gradient-to-r from-[#F4D19B] to-[#78BEF4]" htmlFor="">

                <div className='flex flex-col items-center'>
                    <h6 className={'mt-2 text-xl'}> Welcome to <span className={'text-[#facc15]'}>Gallerymojo.</span></h6>
                    <h2 className={'mt-3 text-2xl font-bold'}>Sign In</h2>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col items-center mt-3'>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-5 h-[50px] w-full rounded-md border border-gray-700 bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] text-sm text-gray-700 pl-6'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-5 h-[50px] w-full rounded-md border border-gray-700 bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] text-sm text-gray-700 pl-6'
                    />
                    <button type="submit" className='mt-5 h-[50px] w-full rounded-md border border-black text-sm pl-6 bg-gray900 text-gray100'>Sign In</button>
                    {error && <span className={'mt-3 text-[#E11D48]'}>Wrong email or password!</span>}
                </form>
                <div className={'flex mt-4 w-[600px] items-center justify-evenly'}>
                    <div className={'border-t-2 border-gray-400 w-6/12'}></div>
                    <p className={'font-bold mx-2'}>OR</p>
                    <div className={'border-t-2 border-gray-400 w-6/12'}></div>
                </div>
                <div className={'flex items-center justify-evenly mt-4'}>
                    <div className={'w-[260px] h-[45px] border border-black ml-3 flex items-center justify-evenly cursor-pointer bg-[#4C8BF5]'}>
                        <button type={'button'} onClick={handleGoogleLogin}>
                            Sign In With Google
                        </button>
                        <AiOutlineGoogle size={'20px'} />
                    </div>
                    <div className={'w-[260px] h-[45px] border border-black ml-3 flex items-center justify-evenly cursor-pointer bg-[#4267B2]'}>
                        <button type={'button'} onClick={handleFacebookLogin}>
                            Sign In With FaceBook
                        </button>
                        <FaFacebookF size={'20px'} />
                    </div>
                </div>

                <p className={'text-center mt-4 cursor-pointer'}>Forgot your password ?</p>
            </label>
        </label>

    </>)
}