import {useSelector} from "react-redux";
import {userInfo} from "../../features/user/userSlice";

export const UserProfile=()=>{
    const user = useSelector(userInfo)
    console.log('user',user)
    return(<div>{user.email}</div>)
 }
