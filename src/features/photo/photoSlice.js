import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pexelApi from '../../api'

let pageNum = 2

const catagories = ['Nature', 'Girls', 'Street Photos', 'Sci-fi', 'Esthetic', 'Space', 'Travel', 'Cinematic']
let randomCatagories = catagories[Math.floor(Math.random() * catagories.length)]

const initialState = {
    photoLoading: false,
    catagory: 'nature',
    orientation: '',
    photos: {},
    searchPhotos: {},
    photoDetailInfo: {},
    relatedPhotos: {},
}

// FETCH EXPLORE PHOTO
export const fetchPhotos = createAsyncThunk('photos/fetchPhotos',
    async () => {
        const response = await pexelApi.get(`v1/curated/?page=${1}&per_page=20`)
        // const response = await pexelApi.get(`list?page=2&limit=20`)
        return response.data.photos;
        // return response.data;
    })


// FETCH FOR INFINITE PHOTO
export const fetchNextPhotos = createAsyncThunk('photos/fetchNextPhotos',
    async () => {
        const response = await pexelApi.get(`v1/curated/?page=${pageNum}&per_page=20`)
        // const response = await pexelApi.get(`list?page=${pageNum}&limit=20`)
        pageNum += 1
        return response.data.photos;
        // return response.data;
    })

// FETCH PHOTO DETAIL
export const fetchPhotoDetail = createAsyncThunk('photos/fetchPhotoDetail',
    async (id) => {
        const response = await pexelApi.get(`v1/photos/${id}`)
        return response.data
    })

// FETCH RELATED PHOTOS
export const fetchRelatedPhotos = createAsyncThunk('photos/fetchRelatedPhotos',
    async (colorHex) => {
        const response = await pexelApi.get(`/v1/search?query=${randomCatagories}&color=${colorHex}&per_page=9`)
        return response.data
    })


// FETCH SEARCH PHOTO
export const fetchSearchPhoto = createAsyncThunk('photos/fetchSearchPhotos',
    async (arg, { getState }) => {
        const state = getState();
        const response = await pexelApi.get(`/v1/search?query=${state.photos.catagory}&orientation=${state.photos.orientation}&per_page=20`)
        return response.data
    })

// FETCH FOR NEXT SEARCH INFINITE PHOTO
export const fetchNextSearchPhotos = createAsyncThunk('photos/fetchNextSearchPhotos',
    async (arg, { getState }) => {
        const state = getState();
        // const response = await pexelApi.get(arg)
        const response = await pexelApi.get(`/v1/search?query=${state.photos.catagory}&orientation=${state.photos.orientation}&page=${pageNum}&per_page=20`)
        pageNum += 1
        console.log(response.data.photos)
        return response.data.photos;
        // return response.data;
    })


const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        selectedCatagory: (state, action) => {
            state.catagory = action.payload
        },
        removeSelectedCatagory: (state) => {
            state.searchPhotos = {}
        },
        selectedOrientation: (state, action) => {
            state.orientation = action.payload
        },
        removeSelectedOrientation: (state) => {
            state.orientation = ''
        }
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

        // FETCH RELATED PHOTOS
        [fetchRelatedPhotos.fulfilled]: (state, action) => {
            // console.log(action)
            state.photoLoading = false
            state.relatedPhotos = action.payload;
        },

        // FETCH SEARCH PHOTOS
        [fetchSearchPhoto.pending]: (state) => {
            state.photoLoading = true
        },

        [fetchSearchPhoto.fulfilled]: (state, action) => {
            state.photoLoading = false
            state.searchPhotos = action.payload
        },

        // FETCH NEXT SEARCH PHOTO
        [fetchNextSearchPhotos.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.searchPhotos.photos = state.searchPhotos?.photos.concat(Array.from(action.payload));
        },
    }

})

export const {
    selectedCatagory,
    removeSelectedCatagory,
    selectedOrientation, 
    removeSelectedOrientation } = photoSlice.actions;

export default photoSlice.reducer;