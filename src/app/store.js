import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../features/photo/photoSlice'

export const store = configureStore({
  reducer: {
    photos: photoReducer
  },
});
