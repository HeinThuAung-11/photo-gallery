import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenerateAvatar } from '../UserProfile/GenerateAvatar';
import { ForgotPassword } from "./ForgotPassword";
import randomImage from "../../assets/mansoryGrid";
import InfiniteMansory from "../../components/InfiniteMansory/InfiniteMansory";
// REDUX
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";
// THIRD PARTIES
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from "react-lazy-load-image-component";
// FIREBASE
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAdditionalUserInfo
} from 'firebase/auth'
import { auth, db } from "../../utli/firebase";
import { setDoc, doc } from 'firebase/firestore';
// CSS
import './Login.css'

export const LoginPage = () => {
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
                toast.success('Login Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setError(null)
                setTimeout(() => {
                    navigate('/userprofile')
                }, 2000)

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
                toast.success('Login Successfully With Google Account!', {
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
    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((response) => {
                // The signed-in user info.
                const isNew = getAdditionalUserInfo(response);
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
                toast.success('Login Successfully With Facebook Account!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    dispatch(login(payload))
                    setError(null)
                    navigate('/userprofile')
                }, 2000)
            }).catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div className='pb-10 h-[90vh] relative'>
            <div className="mx-[8vw] lg:mx-[15vw] h-[91vh] relative overflow-hidden blur-sm opacity-70">
                <InfiniteMansory staticMansory={true} datas={randomImage} />
                {/* <InfiniteScroll
                    dataLength={randomImage.length}
                    hasMore={false}
                >
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="20px">
                            {
                                randomImage?.map((photo, index) => (
                                    <div
                                        key={index}
                                        className='mx-auto'>
                                        <LazyLoadImage
                                            className="mx-auto"
                                            effect="blur"
                                            alt="masonryPhotos"
                                            src={photo}
                                            placeholderSrc='https://via.placeholder.com/240'
                                        />
                                    </div>
                                ))
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll> */}
            </div>

            {/* Form */}
            <div
                className={'glass max-w-[656px] px-7 py-10 mx-auto rounded-md absolute m-0 mt-0 mb-10 lg:m-auto lg:mt-20 left-0 right-0 top-0'}>
                <div className='font-montserrat flex flex-col items-center'>
                    <h6 className={'mt-2 text-xl'}> Welcome to <span className={'font-rockwell tracking-wide text-[#FCAD38]'}>gallerymojo.</span></h6>
                    <h2 className={'mt-3 text-2xl font-bold'}>Sign In</h2>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col items-center mt-3 font-montserrat'>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className=' tracking-wider mt-5 h-[50px] w-full rounded-none border border-gray-700 bg-transparent text-sm text-gray-700 pl-6 placeholder-gray600'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className=' tracking-wider mt-5 h-[50px] w-full rounded-none border border-gray-700 bg-transparent text-sm text-gray-700 pl-6 placeholder-gray600'
                    />
                    <button
                        type="submit"
                        className='loginBox hover:shadow-none tracking-wider mt-5 h-[50px] w-full rounded-none text-sm pl-6 bg-gray900 text-gray100 transition'>
                        Sign In
                    </button>
                    {error && <span className={'mt-3 text-[#E11D48]'}>Wrong email or password!</span>}
                </form>
                <div className={'flex mt-4 w-full lg:w-[600px] items-center justify-evenly'}>
                    <div className={'border-t-2 border-[#B5B5B5] w-3/5 lg:w-6/12 '}></div>
                    <p className={'font-bold mx-2 font-montserrat tracking-wider'}>OR</p>
                    <div className={'border-t-2 border-[#B5B5B5] w-3/5 lg:w-6/12 '}></div>
                </div>
                <div className={'flex lg:flex-row flex-col items-center justify-evenly mt-4'}>
                    <div className={'font-montserrat hover:opacity-90 text-gray100 w-[100%] lg:w-[260px] h-[45px] rounded-none cursor-pointer bg-[#4C8BF5]'}>
                        <button
                            type={'button'}
                            onClick={handleGoogleLogin}
                            className={'loginBox hover:shadow-none tracking-wider w-full h-full flex items-center justify-center px-4 transition'}>
                            Sign in with Google
                            <AiOutlineGoogle className='ml-3' size={'20px'} />
                        </button>
                    </div>
                    <div className={'font-montserrat hover:opacity-90 text-gray100 w-[100%] lg:w-[260px] h-[45px] rounded-none  cursor-pointer bg-[#4267B2] mt-4 lg:mt-0'}>
                        <button
                            type={'button'}
                            onClick={handleFacebookLogin}
                            className={'loginBox hover:shadow-none tracking-wider w-full h-full flex items-center justify-center px-4 transition'}>
                            Sign in with Facebook
                            <FaFacebookF className='ml-3' size={'20px'} />
                        </button>
                    </div>
                </div>

                <ForgotPassword />
                <p className={'font-montserrat text-center mt-4'}>Don't have an Account?{' '}
                    <span onClick={() => navigate('/register')}
                        className={'font-semibold hover:opacity-80 inline text-gray900 underline cursor-pointer'}>
                        Sign up here!
                    </span>
                </p>

            </div>
        </div>
    )
}