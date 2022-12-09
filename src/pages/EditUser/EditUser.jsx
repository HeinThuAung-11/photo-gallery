import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import {useContext, useEffect, useState} from "react";
import { auth, db } from "../../utli/firebase";
import {setDoc, doc, updateDoc} from 'firebase/firestore'
import { AiOutlineGoogle } from "react-icons/ai";
import {FaFacebookF, FaWrench} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {getAllData, login, userInfo, userSlice} from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { GenerateAvatar } from "../UserProfile/GenerateAvatar";
import {useAuth} from "../../utli/Auth";
import {toast, ToastContainer} from "react-toastify";
export const EditUser = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')
    const [open,setopen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useAuth();

    const handleChangeInformation= (e) => {
        e.preventDefault();
        const docRef = doc(db, "users", currentUser.uid);
        if(username.length > 0){
        const data={
            username
        }
        updateDoc(docRef,data).then(
            docRef=>{
                setUsername('')
                console.log('DOC REF',docRef)
                toast.success('Username Changed Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(getAllData(currentUser.uid))
            }

        ).catch(error => {
            setError(error);
        })
        }

    }

    return (<div>
        {/*<button className="btn mt-7 min-w-[300px] min-h-[45px] cursor-pointer">*/}
        {/*    <label htmlFor="editUser">Change Information</label>*/}
        {/*    <FaWrench className="ml-3" />*/}
        {/*</button>*/}
        <label htmlFor="editUser" className="btn mt-7 min-w-[300px] min-h-[45px] cursor-pointer" onClick={()=>setopen(true)}>
            Change Information
            <FaWrench className="ml-3" />
        </label>

        <input type="checkbox" id="editUser" className="modal-toggle" checked={open} readOnly={true}/>
        <label htmlFor="editUser" className="modal cursor-pointer rounded-lg">

                <label className={`modal-box relative max-w-[656px] px-7 py-10`} htmlFor="editUser">

                    <div className='flex flex-col items-center'>

                        <h2 className={'mt-3 text-2xl font-bold'}>Change Information</h2>

                    </div>
                    <form onSubmit={handleChangeInformation} className='flex flex-col items-start mt-3'>
                        <p>Change Username:</p>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className='mt-2 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'
                        />

                        <button type="submit" htmlFor="editUser" className='mt-9 h-[50px] w-full rounded-md border border-black text-sm text-gray-700 pl-6 btn' onClick={()=>setopen(false)}>Confirm Changes</button>

                        {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}
                    </form>

                </label>

                {/*// <label className="modal-box relative max-w-[656px] px-7 py-10" htmlFor="editUser">*/}
                {/*//*/}
                {/*//     <div className='flex flex-col items-center'>*/}
                {/*//*/}
                {/*//         <h2 className={'mt-3 text-2xl font-bold'}>Change Information</h2>*/}
                {/*//*/}
                {/*//     </div>*/}
                {/*//     <form onSubmit={handleChangeInformation} className='flex flex-col items-start mt-3'>*/}
                {/*//         <p>Change Username:</p>*/}
                {/*//         <input*/}
                {/*            type="text"*/}
                {/*            placeholder="Username"*/}
                {/*            onChange={(e) => setUsername(e.target.value)}*/}
                {/*            className='mt-2 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'*/}
                {/*        />*/}
                {/*        <p>Old Password:</p>*/}
                {/*        <input*/}
                {/*            type="email"*/}
                {/*            placeholder="Email"*/}
                {/*            onChange={(e) => setEmail(e.target.value)}*/}
                {/*            className='mt-2 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'*/}
                {/*        />*/}
                {/*        <p>New Password:</p>*/}
                {/*        <input*/}
                {/*            type="password"*/}
                {/*            placeholder="Password"*/}
                {/*            onChange={(e) => setPassword(e.target.value)}*/}
                {/*            className='mt-2 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'*/}
                {/*        />*/}
                {/*        <p>Confirm New Password:</p>*/}
                {/*        <input*/}
                {/*            type="password"*/}
                {/*            placeholder="Confirm Password"*/}
                {/*            onChange={(e) => setConfirmPassword(e.target.value)}*/}
                {/*            className='mt-2 h-[50px] w-full rounded-md border border-gray-700 bg-[#F2F2F2] text-sm text-gray-700 pl-6'*/}
                {/*        />*/}
                {/*        <button type="submit" className='mt-9 h-[50px] w-full rounded-md border border-black text-sm text-gray-700 pl-6'>Confirm Changes</button>*/}
                {/*        {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}*/}
                {/*    </form>*/}

                {/*</label>*/}


        </label>

    </div>)
}