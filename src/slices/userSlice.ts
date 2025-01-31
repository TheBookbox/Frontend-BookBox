import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "@/services/userService";
import { RootState } from "../../store";
import { User } from "@/utils/interfaces";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null

}



export const profile = createAsyncThunk<{user: any}, void, {state: RootState}>('user/profile', async(_,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(token)

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
        .addCase(profile.pending, (state) => {
            state.loading = true
            state.error = false
        })

        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.success = true
            state.user = action.payload
        })
    }
})





export const{resetMessage} = userSlice.actions

export default userSlice.reducer
