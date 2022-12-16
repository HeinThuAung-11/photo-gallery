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
import { EditUser } from "../EditUser/EditUser";
import './UserImage.css'
import { UserPhoto } from "./UserPhoto";
import { UserNav } from "./UserNav";
import { UserVideo } from "./UserVideo";
export const UserProfile = () => {
    const user = useSelector(userInfo);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const [userPhoto, setUserPhoto] = useState(userimg)
    const [type, setType] = useState('photo')
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // console.log('image', file)
            setUserPhoto(URL.createObjectURL(file))

            const imageRef = ref(storage, `/images/${file.name + currentUser.uid}`);
            const uploadTask = uploadBytesResumable(imageRef, file);

            uploadBytes(imageRef, file)
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            console.log('url', url)
                            updateDoc(doc(db, 'users', currentUser.uid), {
                                userPhoto: url,
                            })
                            dispatch(getAllData(currentUser.uid))
                        })
                        .catch((error) => {
                            console.log(error.message, "error getting the image url");
                        });

                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    // console.log('user porofile', user.userPhoto)
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
                    <div className="userwrapper">
                        <img src={user.userPhoto ? user.userPhoto : userPhoto} alt='user' className="cursor-pointer userimg" />

                    </div>
                </label>

                <h5 className="font-semibold mt-7 text-xl">{user.username}</h5>
                <EditUser />
                <h1 className="mt-7 font-bold text-3xl">Your Collections</h1>
            </div>
            <UserNav setType={setType} photoCount={user.favourite_photo_id.length} videoCount={user.favourite_video_id.length} />
            {
                type === 'photo' ? <UserPhoto photoId={user.favourite_photo_id} userId={currentUser.uid}/> : <UserVideo videoId={user.favourite_video_id} userId={currentUser.uid} />

            }

        </>)
}

