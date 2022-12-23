import { useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
import { getAllData } from "../../features/user/userSlice";
// THIRD LIBARIES
import { FaWrench } from "react-icons/fa";
// FIREBASE
import { useAuth } from "../../utli/Auth";
import { db } from "../../utli/firebase";
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from "react-toastify";

export const EditUser = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')
    const [open, setopen] = useState(false)
    const dispatch = useDispatch()
    const { currentUser } = useAuth();

    const handleChangeInformation = (e) => {
        e.preventDefault();
        const docRef = doc(db, "users", currentUser.uid);
        if (username.length > 0) {
            const data = {
                username
            }
            updateDoc(docRef, data).then(
                docRef => {
                    setUsername('')
                    toast.success('Username Changed Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setopen(false)
                    dispatch(getAllData(currentUser.uid))
                }

            ).catch(error => {
                setError(error);
            })
        }

    }

    return (
        <div>
            <label htmlFor="editUser"
                className="loginBox btn mt-7 w-[220px] lg:w-[280px] h-[45px] lg:h-[45px] bg-gray900 rounded-none cursor-pointer font-montserrat hover:shadow-none tracking-wider text-xs lg:text-sm"
                onClick={() => setopen(true)}>
                Change Information
                <FaWrench className="ml-3" />
            </label>

            <input type="checkbox" id="editUser" className="modal-toggle" checked={open} readOnly={true} />
            <label htmlFor="editUser" className="modal cursor-pointer rounded-lg">

                <label className={`custom-bg-gradient modal-box relative max-w-[656px] px-7 py-10`} htmlFor="editUser">

                    <div className='flex flex-col items-center'>

                        <h2 className={'mt-3 text-2xl font-bold tracking-wider'}>Change Information</h2>

                    </div>
                    <form onSubmit={handleChangeInformation} className='font-montserrat flex flex-col items-start mt-3'>
                        <label htmlFor="editUser"
                            onClick={() => setopen(false)}
                            className="btn btn-sm btn-circle absolute right-2 top-2">
                            ✕
                        </label>
                        <p>Change Username:</p>
                        <input
                            required
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className='mt-2 h-[50px] w-full rounded-none border border-gray-700 bg-transparent text-sm text-gray-700 pl-6'
                        />

                        <button type="submit" htmlFor="editUser" className='loginBox hover:shadow-none hover:opacity-90 tracking-wider mt-5 h-[50px] w-full rounded-none text-sm pl-6 bg-gray900 text-gray100 btn'>Confirm Changes</button>

                        {error && <span className={'text-[#E11D48] mt-3'}>{error}</span>}
                    </form>
                </label>
            </label>

        </div>)
}