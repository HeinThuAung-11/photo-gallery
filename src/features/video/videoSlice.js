import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pexelApi from '../../api';
const initialState = {
    videos: [],
    videoDetail:{}
}

export const fetchPopularVideo = createAsyncThunk(
  'video/getPopularVideo',
  async () => {
    const response = await pexelApi.get('videos/popular?page=1&per_page=20')
    console.log('response', response.data.videos)
    return response.data.videos
  }
)

export const fetchVideoDetail= createAsyncThunk(
    'video/getVideoDetail',
    async (videoId) => {
        console.log('fetchvideodetial',videoId)
        const response = await pexelApi.get(`videos/videos/${videoId}`)
        console.log('response', response)
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
        state.videos = action.payload;
      })
        .addCase(fetchVideoDetail.fulfilled,(state,action)=>{
            state.videoDetail = action.payload
        })
  },
})
export const getPopularVideo =(state)=>state.videos;
export const getVideoDetail= (state)=>state.videos.videoDetail
export const selectVideoById=(state,videoId)=>state.videos.videos.filter(video=>video.id == videoId)
export default videoSlice.reducer