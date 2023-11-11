"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector} from "react-redux";
import axios from "axios";

const Login = () => {
    const {user} = useSelector(store => store.auth)


    const [state, setState] = useState({
        email:'',
        password:'',
    })

    const handleChange = (e)=>{
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        const {email, password} = state;
        if(!email || !password) return toast.error('Both fields are required')
        try{
            let res = await axios.post('/api/auth/login', {email, password})
            if(res?.data?.currentUser && res?.data?.accessToken){
                
                localStorage.setItem("user", JSON.stringify(res?.data?.currentUser))
                localStorage.setItem("token", res?.data?.accessToken)
                window.location.href='/'
            }
        }catch(error){
            toast.error(error?.response?.data?.message)
        }
        
    
    }

  return (
    <div className='w-full flex flex-wrap p-5 mt-10 mb-48'>
        <div className='w-full md:w-1/2 p-8'>
        <h1 className='text-5xl font-bold mb-8'>Sign In</h1>
        <h4 className='text-2xl'>Log in to BeeLog by to crate your own blogs.</h4>
        <p className="my-5 text-neutral-500">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com"
        </p>
        </div>
        <div className='w-full md:w-1/2 p-8 shadow-lg rounded-lg'>
            <form onSubmit={handleLogin}>
                <h1 className="text-3xl text-neutral-600 mb-4 text-center">Enter email & password to continue.</h1>
                <hr></hr>
                
                <input name="email" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='email' placeholder='enter your email'/>
                <label>Password</label>
                <input name="password" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='password' placeholder='enter your password'/>
                
                <div className="flex justify-end">
                <button className="py-3 px-10 shadow rounded-lg bg-orange-400" type="submit">Sign In</button>
                </div>
                
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login