import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    userInfo:{
        email: null,
        userId: null,
    }
}

export const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log('aciton',action, state)
            state.userInfo = action.payload
        }
    }

})

export const {login} = userSlice.actions
export const userInfo = (state)=>state.user.userInfo
export default userSlice.reducer