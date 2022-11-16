import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pexelApi from '../../api'

const initialState = {
    photos: {},
    loading: false,
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos',
    async () => {
        const response = await pexelApi.get(`v1/curated/?per_page=20`)
        return response.data;
    })

// export const fetchNextPhotos = createAsyncThunk('photos/fetchNextPhotos',
//     async (next) => {
//         const response
//     })

const photoSlice = createSlice({
    name: 'photos',
    initialState,
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
        }
    }

})

export const getPhoto = (state) => state.photos.photos
export const getLoading = (state) => state.photos.loading

export default photoSlice.reducer;