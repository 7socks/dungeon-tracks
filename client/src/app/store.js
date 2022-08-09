import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './reducers/audioSlice';

export default configureStore({
  reducer: {
    audio: audioReducer
  }
});