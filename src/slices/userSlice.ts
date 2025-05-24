import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "@/services/userService";
import { RootState } from "../../store";
import { User } from "@/utils/interfaces";
import { act } from "react";

export interface Follower {
    userId: string;
    username?: string;
    // outras propriedades conforme necessário
  }
  
  export interface UserState {
    user: User;
    profile: any
    error: '',
    success: boolean,
    EditSuccess: boolean,
    loading: boolean,
    followLoading: boolean,
    message: null
    // outras propriedades do usuário...
    followers?: Follower[];
  }

const initialState: UserState = {
    user: {},
    profile: {},
    error: '',
    success: false,
    EditSuccess: false,

    loading: false,
    followLoading: false,
    message: null

}



export const profile = createAsyncThunk<{user: any}, void, {state: RootState}>('user/profile', async(_,thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(token)

    return data

})

export const getUserById = createAsyncThunk('user/getUserById' , async(id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.getUserById(id, token)
    if(data.erro){
        thunkAPI.rejectWithValue(data.erro[0])
    }

    return data
})


export const followSomeone = createAsyncThunk('user/followSomeone', async(id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.followSomeone(id, token)
    if(data.error){
        thunkAPI.rejectWithValue(data.error[0])
    }

    return data
})


export const unfollowSomeone = createAsyncThunk('user/unfollowSomeone', async(id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.unfollowSomeone(id, token)
    if(data.error){
        thunkAPI.rejectWithValue(data.error[0])
    }

    return data
})

export const editProfile = createAsyncThunk('user/editProfile', async(name: string, thunkAPI: any) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await userService.editProfile(name, token)
    if(data.erro){
        thunkAPI.rejectWithValue(data.erro[0])
    }


    return data
})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },

    extraReducers: (builder) => {
        builder


        .addCase(editProfile.pending, (state) => {
            state.loading = true
            state.EditSuccess = false
            state.error = ''
        })

        .addCase(editProfile.rejected, (state, action) => {
            state.loading = false
            state.EditSuccess = false
            state.error = action.payload as ''

        })

        .addCase(editProfile.fulfilled, (state, action) => {
            

            state.loading = false
            state.EditSuccess = true
            state.error = ''
            state.user = action.payload
        })

        


         .addCase(unfollowSomeone.pending, (state) => {
            state.followLoading = true
            state.error = ''
            state.success = false
        })

        .addCase(unfollowSomeone.rejected, (state, action) => {
            state.followLoading = false
            state.error = action.payload as ''
            state.success = false
        })

        .addCase(unfollowSomeone.fulfilled, (state, action) => {
            state.followLoading = false
            state.error = ''
            state.success = false

            state.profile.followers = state.profile.followers?.filter((follow: Follower) => follow.userId !== action.payload.userId)
        })

        .addCase(followSomeone.pending, (state) => {
            state.followLoading = true
            state.error = ''
            state.success = false
        })

        .addCase(followSomeone.rejected, (state, action) => {
            state.followLoading = false
            state.error = action.payload as ''
            state.success = false
        })

        .addCase(followSomeone.fulfilled, (state, action) => {
            state.followLoading = false
            state.error = ''
            state.success = false

            state.profile.followers = [...(state.profile.followers || []), action.payload]
        })
        
        
        .addCase(getUserById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as ''
            state.success = false
            state.profile = {}
    
        })

        .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.success = true
            state.profile = action.payload

        })

        .addCase(getUserById.pending, (state) => {
            state.loading = true
            state.error = ''
            state.success = false
        })

        .addCase(profile.pending, (state) => {
            state.loading = true
            state.error = ''
        })

        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.success = true
            state.user = action.payload as User
        })
    }
})





export const{resetMessage} = userSlice.actions

export default userSlice.reducer
