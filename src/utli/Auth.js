import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('USer', user)
                setCurrentUser(user)
            }
            else {
                setCurrentUser(null)
            }
        })
    })
    return { currentUser }

}

