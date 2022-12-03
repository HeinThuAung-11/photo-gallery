import { configureStore } from '@reduxjs/toolkit';
// import storage from "redux-persist/lib/storage"
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// // import { persistReducer } from 'redux-persist'
// import { combineReducers } from '@reduxjs/toolkit';
import photoReducer from '../features/photo/photoSlice'
import userReducer from '../features/user/userSlice'
import videoReducer from '../features/video/videoSlice'
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage
// }

// const reducer = combineReducers({
//   photos: photoReducer
// })

// const persistedReducer = persistReducer(persistConfig, reducer)

// export const store = configureStore({
//   reducer: {
//     reducer: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    user: userReducer,
    videos: videoReducer
  },
});
