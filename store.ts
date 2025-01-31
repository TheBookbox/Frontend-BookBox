import { configureStore } from "@reduxjs/toolkit";
import authReducer from './src/slices/authSlice'
import userReducer from "@/slices/userSlice";
import reviewReducer from '@/slices/reviewSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        review: reviewReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store