import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userInfo } from "../../features/user/userSlice";
import { useAuth } from "../../utli/Auth";

export const LogOut = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const { currentUser } = useAuth()
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(logout())
            navigate('/')
        }).catch((error) => {

        });
    }

    return (<div>
        <button className={`btn btn-error ml-5 ${currentUser.email == null ? 'btn-disabled' : ''}`} onClick={handleLogout}>LogOut </button>
    </div>)
}