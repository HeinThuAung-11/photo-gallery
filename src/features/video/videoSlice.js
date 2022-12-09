import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pexelApi from '../../api';
const initialState = {
    allVideos: [],
    videoDetail:{},
    catagory: 'nature',
    searchVideos: {},
    relatedVideos: {},
}

let pagenum = 2;
let searchpagenum = 2;
export const fetchPopularVideo = createAsyncThunk(
  'video/fetchPopularVideo',
  async () => {
    const response = await pexelApi.get('videos/popular?page=1&per_page=20')
    console.log('response fetchPopular', response.data.videos)
    return response.data.videos
  }
)

export const fetchMoreVideo = createAsyncThunk(
    'video/fetchMoreVideo',
    async ()=>{
        console.log('calling api')
        const response = await pexelApi.get(`videos/popular?page=${pagenum}&per_page=20`)
        pagenum++;
        console.log('response fetchMore', response.data.videos, pagenum)
        return response.data.videos
    }
)
export const fetchVideoDetail= createAsyncThunk(
    'video/fetchVideoDetail',
    async (videoId) => {
        console.log('fetchvideodetial',videoId)
        const response = await pexelApi.get(`videos/videos/${videoId}`)
        console.log('response', response)
        return response.data
    }
)

export const fetchSearchVideo = createAsyncThunk(
    'video/fetchSearchVideo',
    async (args,{ getState })=>{
        const state = getState()
        console.log('fetch serach video working',state)
        const response = await pexelApi.get(`videos/search?query=${state.photos.catagory}&orientation=${state.photos.orientation}&per_page=30`)
        console.log('response fetch search video', response)
        return response.data
    }
)

export const fetchSearchMoreVideo = createAsyncThunk(
    'video/fetchSearchMoreVideo',
    async (args,{ getState })=>{
        const state = getState()
        const response = await pexelApi.get(`videos/search?query=${state.photos.catagory}&orientation=${state.photos.orientation}&page=${searchpagenum}&per_page=20`)
        return response.data.videos
    }
)

export const fetchRelatedVideo = createAsyncThunk(
    'video/fetchRelatedVideo',
    async (args,{ getState })=>{
        const state = getState()
        const response = await pexelApi.get(`videos/search?query=${state.photos.catagory}&orientation=${state.photos.orientation}&per_page=10`)
        return response.data
    }
)
export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularVideo.fulfilled, (state, action) => {
        // console.log('action extra reducer', action.payload, state.userInfo)
        state.allVideos = action.payload;
      })
        .addCase(fetchVideoDetail.fulfilled,(state,action)=>{
            state.videoDetail = action.payload
        })
        .addCase(fetchMoreVideo.fulfilled,(state,action)=>{
            state.allVideos = [...state.allVideos , ...action.payload]
        })
        .addCase(fetchSearchVideo.fulfilled,(state,action)=>{
            state.searchVideos = action.payload
        })
        .addCase(fetchSearchMoreVideo.fulfilled,(state,action)=>{
            state.searchVideos = [...state.searchVideos , ...action.payload]
        })
        .addCase(fetchRelatedVideo.fulfilled,(state,action)=>{
            state.relatedVideos = action.payload
        })
  },
})
export const getPopularVideo =(state)=>state.videos.allVideos;
export const getVideoDetail= (state)=>state.videos.videoDetail;
export const getSearchVideo=(state) =>state.videos.searchVideos.videos;
export const getRelatedVideo=(state)=>state.videos.relatedVideos.videos;
export const getSearchVideoResult = (state) =>state.videos.searchVideos.total_results;
export const selectVideoById=(state,videoId)=>state.videos.allVideos.filter(video=>video.id == videoId)
export default videoSlice.reducer