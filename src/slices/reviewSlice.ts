import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import reviewService from "@/services/reviewService";
import { Review, ReviewEdit } from "@/utils/interfaces";
import { act } from "react";

interface ReviewState {
    review: Review | null
    reviews: Review[];
    error: string | null | unknown;
    success: string | null;
    loading: boolean;
    message: string | null;
}

const initialState: ReviewState = {
    review: null,
    reviews: [] as Review[],
    error: null, 
    success: null,
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

export const getReviewById = createAsyncThunk('review/getById', async(id: string, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getReviewById(id, token)

    if(data.erro){
        return thunkAPI.rejectWithValue(data.error[0])
    }

    return data
})

export const deleteReview = createAsyncThunk('review/delete', async(id: string, thunkApi) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.deleteReview(id, token)

    if(data.erro){
        return thunkApi.rejectWithValue(data.error[0])
    }

    return data
})

export const editReview = createAsyncThunk('review/edit', async(reviewData: ReviewEdit, thunkApi) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.editReview(
        { stars: reviewData.stars, text: reviewData.text, _id: reviewData._id },
        reviewData._id,
        token
    )

    if(data.erro){
        return thunkApi.rejectWithValue(data.erro[0])
    }

    return data
})









const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reset: (state) => {
            state.success = null
            state.error = null
            state.message = null
        }
    },

    extraReducers: (builder) => {
        builder

        .addCase(getReviewById.pending, (state) => {
            state.loading = true,
            state.error = null,
            state.success = null
        })

        .addCase(getReviewById.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = ''
            state.review = action.payload
        })
        
        .addCase(getReviewById.rejected, (state, action) => {
            state.error = action.payload

        })


        .addCase(getAllReviews.pending, (state) => {
            state.loading = true,
            state.error = null,
            state.success = null
        })

        .addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = ''
            state.reviews = action.payload
        })
        

        .addCase(getUserReview.pending, (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(getUserReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.reviews = action.payload
        })

        .addCase(deleteReview.pending, (state) => {
            state.loading = true
            state.error = null
            
        })

        .addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = 'Deletada com sucesso'
            state.reviews = state.reviews.filter((review: Review) => {
                return review._id !== action.payload.id 
            
            })
        })


        .addCase(editReview.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = null
            state.message = null
        })

        .addCase(editReview.fulfilled, (state, action) => {

            state.loading = false
            state.error = null
            state.success = 'Review editada com sucesso.'
         
            state.reviews = state.reviews.map(review => {

                if(review._id == action.payload._id){
                    
                    return {
                        ...review,
                        stars: action.payload.stars,
                        text: action.payload.text
                    }
                }
                return review;
            })

            console.log(action.payload.message);
            
        })

        .addCase(editReview.rejected, (state, action) => {
            
            state.error = action.payload

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


export const{reset} = reviewSlice.actions

export default reviewSlice.reducer