import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import Cookies from "js-cookie";
import { User } from "@/utils/interfaces";


const userCookie = Cookies.get('user');

const user = userCookie ? JSON.parse(userCookie) : null;

interface AuthState {
    user: User | null;
    error: string | null; 
    success: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: user ? user : null,
    error: null,
    success: false,
    loading: false,
};


// register

export const register = createAsyncThunk('auth/register', 
    async(user: User, thunkAPI)=>{
        const data = await authService.register(user)

        // Check for errors
        if(data.erro){
            return thunkAPI.rejectWithValue(data.erro[0] as string)
        }

        return data
    }
)

export const login = createAsyncThunk('auth/login', async(user: User, thunkAPI) => {
    const data = await authService.login(user)

    // Check errors
    if(data.erro){
        return thunkAPI.rejectWithValue(data.erro[0] as string)
    }

    return data
})


export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=>{
            state.loading = false
            state.error = null
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder

        // Register
        .addCase(register.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.user = null
        })
        // FIM REGISTER



        // LOGIN
        .addCase(login.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.user = null
        })
        // FIM LOGIN

        // LOGOUT
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.success = false
            state.error = null
            state.user = null
        })
        // FIM LOGOUT


    }
})


export const{reset} = authSlice.actions

export default authSlice.reducer