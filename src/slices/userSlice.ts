import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "@/services/userService";
import { RootState } from "../../store";
import { User } from "@/utils/interfaces";

interface UserState {
    user: User;
    profile: User;
    error: string;
    success: boolean;
    loading: boolean;
    message: string | null;
}


const initialState: UserState = {
    user: {},
    profile: {},
    error: '',
    success: false,
    loading: false,
    message: null

}



export const profile = createAsyncThunk<{user: any}, void, {state: RootState}>('user/profile', async(_,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(token)

    return data

})

export const getUserById = createAsyncThunk('user/getUserById' , async(id: string, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.getUserById(id, token)
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
        
        .addCase(getUserById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.success = false
            state.profile = {}
    
        })

        .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false
            state.error = 'false'
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
