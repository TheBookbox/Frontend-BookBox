import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import reviewService from "@/services/reviewService";
import { Review } from "@/utils/interfaces";

const initialState = {
    reviews: [] as Review[],
    error: false,
    success: false,
    loading: false,
    message: null
}

export const getAllReviews = createAsyncThunk<Review[], void, {state: RootState}>('review/getAll', async(_,thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getAllReviews(token)

    return data
})

export const getUserReview = createAsyncThunk('review/getUserReview', async(userId: string, thunkApi) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.getUserReviews(userId, token)

    return data
})

export const deleteReview = createAsyncThunk('review/delete', async(id: string, thunkApi) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.deleteReview(id, token)

    if(data.error){
        return thunkApi.rejectWithValue(data.error[0])
    }

    return data
})

// export const likeReview = createAsyncThunk('review/like', async(id: string, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token

//     const data = await reviewService.likeReview(id, token)

//     if(data.error){
//         return thunkAPI.rejectWithValue(data.error[0])
//     }

//     return data
// })


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
        

        .addCase(getUserReview.pending, (state) => {
            state.loading = true
            state.error = false
        })

        .addCase(getUserReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.reviews = action.payload
        })

        .addCase(deleteReview.pending, (state) => {
            state.loading = true
            state.error = false
            
        })

        .addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.reviews = state.reviews.filter((review: Review) => {
                return review._id !== action.payload.id 
            
            })
        })




        // .addCase(likeReview.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.success = true
        //     state.error = false

        //     if(state.reviews.likes){
        //         state.reviews.likes.push(action.payload.userId)
        //     }

        //     state.reviews.map(review => {
        //         if(review._id === action.payload.reviewId){
        //             return review.likes.push(action.payload.userId)
        //         }

        //         return review
        //     })

        //     state.message = action.payload.message
        // })


        // .addCase(likeReview.rejected, (state, action) => {
        //     state.loading = false
        //     state.
        // })
    }
})


export const{resetMessage} = reviewSlice.actions

export default reviewSlice.reducer