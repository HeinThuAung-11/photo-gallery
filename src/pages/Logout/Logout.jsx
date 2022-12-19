import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log('Logout called')
    }).catch((error) => {
        console.log("ERROR", error)
    });
}