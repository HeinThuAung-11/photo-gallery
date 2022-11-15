import {useDispatch, useSelector} from "react-redux";
import {getAllData, userInfo} from "../../features/user/userSlice";
import {Login} from "../Login/Login";
import {useEffect, useState} from "react";

export const UserProfile=()=>{
    const user = useSelector(userInfo);
    console.log('user porofule',user)
    return(<div>
    <UserData data={user} />
    </div>)
 }

 const UserData =({data})=>{
    const userdata = data
    return <div>
        {userdata.email}
        {userdata.userId}
        {userdata.username}
        {userdata.favourite_photo_id}
    </div>
 }
