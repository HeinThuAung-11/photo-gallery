import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {collection, doc, getDoc} from "firebase/firestore";

import {db} from "../../utli/firebase";
const initialState ={
    userInfo:{
        email: null,
        userId: null,
        username: null,
        favourite_photo_id:[]
    }
}

export const getAllData = createAsyncThunk(
    'user/getAllData',
    async (userId)=>{
        console.log('Get all data ')
        const response = await getDoc(doc(db,'users',userId))
        console.log('response' ,response.data())
        return response.data()
    }

)
export const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log('action',action, state)
            state.userInfo = action.payload
        },
        logout:(state)=>{
            state.userInfo = {
                email: null,
                userId: null,
                username: null,
                favourite_photo_id:[]
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.fulfilled, (state,action) => {
                console.log('action extra reducer', action.payload , state.userInfo)
                state.userInfo = {...state.userInfo, ...action.payload };

            })


    },

})

export const {login,logout} = userSlice.actions
export const userInfo = (state)=>state.user.userInfo
export default userSlice.reducer