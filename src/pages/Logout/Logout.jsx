import { getAuth, signOut } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout, userInfo} from "../../features/user/userSlice";
export const LogOut = ()=> {
    const auth = getAuth();
    const dispatch = useDispatch();
    const user = useSelector(userInfo)
    const navigate =useNavigate();
    const handleLogout=()=>{
        signOut(auth).then(() => {
            dispatch(logout())
        }).catch((error) => {

        });
    }

return(<div>
    <button className={`btn btn-error ${user.email == null ? 'btn-disabled' : '' }`} onClick={handleLogout}>LogOut </button>
</div>)
}