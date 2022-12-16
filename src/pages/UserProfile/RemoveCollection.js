import {arrayRemove, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utli/firebase";
import {useAuth} from "../../utli/Auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllData} from "../../features/user/userSlice";



export const RemovePhotoCollection= async (userId,element)=>{
	const docRef = doc(db, "users", userId);
	await updateDoc(docRef, {
		favourite_photo_id: arrayRemove(element)
	});
}

export const RemoveVideoCollection= async (userId,element)=>{
	const docRef = doc(db, "users", userId);
	await updateDoc(docRef, {
		favourite_video_id: arrayRemove(element)
	});
}