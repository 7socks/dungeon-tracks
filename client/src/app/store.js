import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './reducers/audioSlice';
import userReducer from './reducers/userSlice';

export default configureStore({
  reducer: {
    audio: audioReducer,
    user: userReducer
  }
});