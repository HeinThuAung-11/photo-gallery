import { useEffect, useState } from "react";
import { EditUser } from "../EditUser/EditUser";
import { UserPhoto } from "./UserPhoto";
import { UserNav } from "./UserNav";
import { UserVideo } from "./UserVideo";
import userimg from "../../assets/images/user.png";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllData, userInfo } from "../../features/user/userSlice";
// FIREBASE
import { db, storage } from "../../utli/firebase";
import { useAuth } from "../../utli/Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";


export const UserProfile = () => {
  const user = useSelector(userInfo);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState(userimg);
  const [type, setType] = useState("photo");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserPhoto(URL.createObjectURL(file));

      const imageRef = ref(storage, `/images/${file.name + currentUser.uid}`);

      uploadBytes(imageRef, file)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              updateDoc(doc(db, "users", currentUser.uid), {
                userPhoto: url,
              });
              dispatch(getAllData(currentUser.uid));
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllData(currentUser.uid));
    }
  }, [currentUser, dispatch, userPhoto]);

  return (
    <>
      <hr className='text-[#AAAAAA] mb-7' />
      <div className="flex flex-col items-center justify-around font-rockwell">
      
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="user-profile"
          onChange={handleImageChange}
        />
        <label htmlFor="user-profile">
          <div
            style={{
              backgroundImage: `url(${
                user.userPhoto ? user.userPhoto : userPhoto
              }})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="h-[30vw] lg:h-[11vw] w-[30vw] lg:w-[11vw] border rounded-full object-fit"
          />
        </label>

        <h5 className="font-semibold mt-7 text-xl">{user.username}</h5>
        <EditUser />
        <h1 className="mt-7 font-bold text-3xl">Your Collections</h1>
      </div>
      <UserNav
        setType={setType}
        photoCount={user.favourite_photo_id.length}
        videoCount={user.favourite_video_id.length}
      />
      {type === "photo" ? (
        <UserPhoto photoId={user.favourite_photo_id} userId={currentUser.uid} />
      ) : (
        <UserVideo videoId={user.favourite_video_id} userId={currentUser.uid} />
      )}
    </>
  );
};
