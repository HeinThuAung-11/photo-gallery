import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pexelApi from '../../api'

const initialState = {
    photos: {},
    pageNum: 2,
    loading: false,
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos',
    async (state = initialState.pageNum) => {
        const response = await pexelApi.get(`v1/curated/?page=1&per_page=20`)
        // const response = await pexelApi.get(`list?page=2&limit=20`)
        return response.data.photos;
        // return response.data;
    })

export const fetchNextPhotos = createAsyncThunk('photos/fetchNextPhotos',
    async (state = initialState.pageNum) => {
        const response = await pexelApi.get(`v1/curated/?page=${state + 1}&per_page=20`)
        // const response = await pexelApi.get(`list?page=${state + 1}&limit=20`)
        return response.data.photos;
        // return response.data;
    })


const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchPhotos.pending]: (state) => {
            state.loading = true
        },
        [fetchPhotos.fulfilled]: (state, action) => {
            console.log(action)
            state.loading = false
            state.photos = action.payload;
        },
        [fetchPhotos.rejected]: (state) => {
            state.loading = false
        },
        [fetchNextPhotos.fulfilled]: (state, action) => {
            console.log(action)
            state.loading = false
            state.photos = state.photos.concat(Array.from(action.payload));
        },
    }

})

export const { nextPage } = photoSlice.actions;
export const getPhoto = (state) => state.photos.photos;
export const getLoading = (state) => state.photos.loading;

export default photoSlice.reducer;