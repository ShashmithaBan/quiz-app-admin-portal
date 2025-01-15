import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import questionReducer from './slice/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
});