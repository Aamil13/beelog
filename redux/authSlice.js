import { createSlice } from "@reduxjs/toolkit";


const initialState = {user: JSON.parse(localStorage.getItem('user')) || null, token: localStorage.getItem('token') || null}

const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        //for sync login
        reset: (state)=> {
            state.user = null
        },
        logout:(state)=>{
            state.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            window.location.href = '/'
        },
        setUser:(state, action)=>{
            state.user = action.payload
        },
        setToken:(state, action)=>{
            state.token = action.payload
        }
        
    },
})

export const {reset, logout, setUser, setToken} = authSlice.actions
export default authSlice.reducer