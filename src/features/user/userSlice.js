import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "../../utli/firebase";
import pexelApi from "../../api";
const initialState = {
    userInfo: {
        email: null,
        userId: null,
        username: null,
        favourite_photo_id: [],
        favourite_video_id: [],
        userPhoto: null,

    }
}

export const getAllData = createAsyncThunk(
    'user/getAllData',
    async (userId) => {
        // console.log('Get all data ')
        const response = await getDoc(doc(db, 'users', userId))
        console.log('response', response.data())
        return response.data()
    }
)

export const fetchFavouritePhotos = createAsyncThunk(
    'user/fetchFavourtePhotos',
        async (arr) => {
            let favouritePhotos =[]
            for(let id of arr){
                const response = await pexelApi.get(`v1/photos/${id}`)
                favouritePhotos.push(response.data)
            }
            return favouritePhotos
        }

)

export const fetchFavouriteVideos = createAsyncThunk(
    'user/fetchFavourteVideos',
    async (arr) => {
        let favouriteVideos =[]
        for(let id of arr){
            const response = await pexelApi.get(`videos/videos/${id}`)
            favouriteVideos.push(response.data)
        }
        return favouriteVideos
    }

)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log('action', action)
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
        logout: (state) => {
            state.userInfo = {
                email: null,
                userId: null,
                username: null,
                favourite_photo_id: [],
                favourite_video_id: [],
                userPhoto: null,
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                // console.log('action extra reducer', action.payload, state.userInfo)
                state.userInfo = { ...state.userInfo, ...action.payload };
            })
            .addCase(fetchFavouritePhotos.fulfilled,(state,action)=>{
                state.favourite_photo_id = action.payload
            })
            .addCase(fetchFavouriteVideos.fulfilled,(state,action)=>{
                state.favourite_video_id = action.payload
            })
    },

})

export const { login, logout } = userSlice.actions;
export const userInfo = (state) => state.user.userInfo;
export const getFavouritePhotos = (state)=>state.user.favourite_photo_id;
export const getFavouriteVideos = (state)=>state.user.favourite_video_id;
export default userSlice.reducer