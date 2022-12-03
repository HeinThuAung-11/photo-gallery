import { useDispatch, useSelector } from "react-redux";
import { getAllData, userInfo } from "../../features/user/userSlice";
import { Login } from "../Login/Login";
import { useEffect, useState } from "react";
import { auth, db } from "../../utli/firebase";
import { useAuth } from "../../utli/Auth";
import userimg from '../../assets/user.png'
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utli/firebase";
import { FaWrench } from 'react-icons/fa';
import { doc, setDoc, updateDoc } from "firebase/firestore";
export const UserProfile = () => {
    const user = useSelector(userInfo);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const [userPhoto, setUserPhoto] = useState(userimg)
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // console.log('image', file)
            setUserPhoto(URL.createObjectURL(file))

            const imageRef = ref(storage, `/images/${file.name + currentUser.uid}`);
            const uploadTask = uploadBytesResumable(imageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log('prog', prog)
                },
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        updateDoc(doc(db, 'users', currentUser.uid), {
                            userPhoto: downloadURL,
                        })
                        dispatch(getAllData(currentUser.uid))
                    });
                }
            );
            // uploadBytes(imageRef, uploadimg)


            //     .then(() => {
            //         getDownloadURL(imageRef)
            //             .then((url) => {
            //                 console.log('url', url)
            //                 setDoc(doc(db, 'users', currentUser.uid), {
            //                     userPhoto: url,
            //                 })
            //             })
            //             .catch((error) => {
            //                 console.log(error.message, "error getting the image url");
            //             });

            //     })
            //     .catch((error) => {
            //         console.log(error.message);
            //     });
        }
    }

    console.log('user porofile', user)
    useEffect(() => {
        // console.log('useeffect called ', currentUser.uid)
        if (currentUser) {
            dispatch(getAllData(currentUser.uid))
        }
    }, [currentUser, dispatch, userPhoto])

    return (
        <>
            <div className="flex flex-col items-center justify-around font-rockwell">
                <input
                    accept="image/*"
                    type="file"
                    style={{ display: 'none' }}
                    id='user-profile'
                    onChange={handleImageChange}
                />
                <label htmlFor="user-profile">
                    <div className="w-[200px] h-[200px]">
                        <img src={user.userPhoto ? user.userPhoto : userPhoto} alt='user' className="cursor-pointer rounded-full object-center" />
                    </div>
                </label>

                <h5 className="font-semibold mt-7 text-xl">{user.username}</h5>

                <button className="btn mt-7 min-w-[300px] min-h-[45px]">Change Information
                    <FaWrench className="ml-3" />
                </button>
                <h1 className="mt-7 font-bold text-3xl">Your Collections</h1>
            </div>
            <div className="btn-group w-full">
                <button className="btn w-1/2 bg-[#D7E9F7] cursor-pointer text-[#000]">Photos</button>
                <button className="btn w-1/2 bg-[#D7E9F7] cursor-pointer text-[#000]">Videos</button>
            </div>
        </>)
}

