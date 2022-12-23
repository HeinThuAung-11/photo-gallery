import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../features/photo/photoSlice'
import userReducer from '../features/user/userSlice'
import videoReducer from '../features/video/videoSlice'

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    user: userReducer,
    videos: videoReducer
  },
});
