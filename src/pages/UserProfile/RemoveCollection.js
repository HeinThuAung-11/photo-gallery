import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utli/firebase";

export const removePhotoCollection = async (userId, element) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    favourite_photo_id: arrayRemove(element),
  });
};

export const removeVideoCollection = async (userId, element) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    favourite_video_id: arrayRemove(element),
  });
};
