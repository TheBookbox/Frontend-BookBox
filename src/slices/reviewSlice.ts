import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "@/services/reviewService";
import { CommentData, Comments, Review, ReviewEdit, ReviewInsert } from "@/utils/interfaces";


interface ReviewState {
    review: Review | null
    reviews: Review[];
    error: string | null | unknown;
    success: string | null;
    loading: boolean;
    message: string | null;
    hasMore: boolean
    commentLoading: boolean
    comments: Comments[] | null
}

const initialState: ReviewState = {
    review: null,
    reviews: [] as Review[],
    error: null, 
    success: null,
    loading: false,
    message: null,
    hasMore: true,
    commentLoading: false,
    comments: null
}

export const getAllReviews = createAsyncThunk('review/getAll', async(limit: number,thunkAPI: any) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getAllReviews(limit,token)

    return data
})

export const getUserReview = createAsyncThunk('review/getUserReview', async(userId: string, thunkApi: any) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.getUserReviews(userId, token)

    return data
})

export const getReviewById = createAsyncThunk('review/getById', async(id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getReviewById(id, token)

    if(data.erro){
        return thunkAPI.rejectWithValue(data.error[0])
    }

    return data
})


export const insertReview = createAsyncThunk('/review/insert', async(data: ReviewInsert, thunkAPI: any) => {

    const token = thunkAPI.getState().auth.user.token 

    const res = await reviewService.insertReview(data, token)


    if(res.erro){
        return thunkAPI.rejectWithValue(res.erro[0])
    }

    return res
    
})

export const deleteReview = createAsyncThunk('review/delete', async(id: string, thunkApi: any) => {
    const token = thunkApi.getState().auth.user.token

    const data = await reviewService.deleteReview(id, token)

    if(data.erro){
        return thunkApi.rejectWithValue(data.error[0])
    }

    return data
})

export const editReview = createAsyncThunk('review/edit', async(reviewData: ReviewEdit, thunkApi: any) => {
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

export const likeReview = createAsyncThunk('review/like', async(id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.likeReview(id, token)

    if(data.erro){
        return thunkAPI.rejectWithValue(data.erro[0])
    }

    return data
})

export const commentReview = createAsyncThunk('review/comment', async(commentData: CommentData, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.commentReview({text: commentData.text}, commentData.idReview, token)

    if(data.erro){
        return thunkAPI.rejectWithValue(data.erro[0])
    }

    return data

    
})

export const getCommentsByIdReview = createAsyncThunk('review/getComments', async(idReview: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await reviewService.getCommentsByIdReview(idReview, token)

    if(data.error){
        return thunkAPI.rejectWithValue(data.error[0])
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

        .addCase(getCommentsByIdReview.pending, (state)=>{
            state.commentLoading = true
            state.error = null
            state.comments = null
            state.success = null
        })

        .addCase(getCommentsByIdReview.fulfilled, (state, action)=>{
            state.commentLoading = false
            state.error = null
            state.comments = action.payload
            state.success = null
        })

        .addCase(getCommentsByIdReview.rejected, (state, action)=>{
            state.commentLoading = false
            state.error = action.payload
            state.comments = null
            state.success = null
        })

        .addCase(insertReview.fulfilled, (state, action) => {
            
            state.loading = false
            state.error = null
            state.success = action.payload.message
            state.reviews = [ action.payload, ...state.reviews]
            
        })

        .addCase(insertReview.pending, (state) => {
            state.loading = true,
            state.error = null,
            state.success = null
        })

        .addCase(insertReview.rejected, (state, action) => {
            state.error = action.payload
        })

        .addCase(commentReview.fulfilled, (state, action) => {
            
            state.loading = false
            state.error = null
            state.success = action.payload.message
            
            state.comments?.unshift(action.payload.data)



            
        })

        .addCase(commentReview.pending, (state) => {
            state.loading = true,
            state.error = null,
            state.success = null
        })

        .addCase(commentReview.rejected, (state, action) => {
            state.error = action.payload
        })

        .addCase(likeReview.rejected, (state, action) => {
            
            state.error = action.payload

        })

        .addCase(likeReview.pending, (state) => {
            state.loading = true,
            state.error = null,
            state.success = null
        })

        .addCase(likeReview.fulfilled, (state, action) => {

         
            state.loading = false
            state.error = null
            state.success = ''

            
            if(state.review?._id == action.payload.review._id){
                state.review?.likes.push(action.payload.id)
            }

            state.reviews = state.reviews.map(review => {
               
                if(review._id == action.payload.review._id){
                    
                    return {
                        ...review,
                        likes: [...review.likes, action.payload.id]
                    }
                   
                }
                
                return review
            })
        })

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
            state.reviews = action.payload.data
            state.hasMore = action.payload.hasMore
            
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


    }
})


export const{reset} = reviewSlice.actions

export default reviewSlice.reducer