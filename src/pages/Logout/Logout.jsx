import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LogOut = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    signOut(auth).then(() => {
        navigate('/login')
        console.log('Logout called')
    }).catch((error) => {
        console.log("ERROR", error)
    });
}