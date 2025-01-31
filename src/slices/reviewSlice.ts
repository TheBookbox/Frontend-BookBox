import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import reviewService from "@/services/reviewService";


const initialState = {
    reviews: [],
    error: false,
    success: false,
    loading: false,
    message: null

}


export const getAllReviews = createAsyncThunk<never[], void, {state: RootState}>('review/getAll', async(_,thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getAllReviews(token)

    return data
})


const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },

    extraReducers: (builder) => {
        builder

        .addCase(getAllReviews.pending, (state) => {
            state.loading = true,
            state.error = false,
            state.success = false
        })

        .addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.success = true
            state.reviews = action.payload
        })
    }
})


export const{resetMessage} = reviewSlice.actions

export default reviewSlice.reducer