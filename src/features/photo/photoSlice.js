import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pexelApi from '../../api'

let pageNum = 2

const initialState = {
    photos: {},
    photoLoading: false,
    photoDetailInfo: {}
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos',
    async () => {
        const response = await pexelApi.get(`v1/curated/?page=${1}&per_page=20`)
        // const response = await pexelApi.get(`list?page=2&limit=20`)
        return response.data.photos;
        // return response.data;
    })

export const fetchNextPhotos = createAsyncThunk('photos/fetchNextPhotos',
    async () => {
        const response = await pexelApi.get(`v1/curated/?page=${pageNum}&per_page=20`)
        // const response = await pexelApi.get(`list?page=${pageNum}&limit=20`)
        pageNum += 1
        return response.data.photos;
        // return response.data;
    })

export const fetchPhotoDetail = createAsyncThunk('photos/fetchPhotoDetail',
    async (id) => {
        const response = await pexelApi.get(`v1/photos/${id}`)
        return response.data
    })


const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
    },
    extraReducers: {
        // FETCH PHOTO
        [fetchPhotos.pending]: (state) => {
            state.photoLoading = true
        },
        [fetchPhotos.fulfilled]: (state, action) => {
            // console.log(action)
            state.photoLoading = false
            state.photos = action.payload;
        },
        [fetchPhotos.rejected]: (state) => {
            state.photoLoading = false
        },

        // FETCH NEXT PHOTO
        [fetchNextPhotos.fulfilled]: (state, action) => {
            // console.log(action)
            state.photoLoading = false
            state.photos = state.photos.concat(Array.from(action.payload));
        },

        // FETCH PHOTO DETAIL
        [fetchPhotoDetail.pending]: (state) => {
            state.photoLoading = true
        },
        [fetchPhotoDetail.fulfilled]: (state, action) => {
            // console.log(action)
            state.photoLoading = false
            state.photoDetailInfo = action.payload;
        },
    }

})

// export const { nextPage } = photoSlice.actions;
// export const getPhoto = (state) => state.photos.photos;
// export const getLoading = (state) => state.photos.photoLoading;
// export const getPhotoDetail = (state) => state.photos.photoDetailInfo;

export default photoSlice.reducer;