"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation";

const Signup = () => {
    const router = useRouter()
    const [state, setState] = useState({
        username:'',
        email:'',
        password:'',
        confirmPass:'',
    })

    const handleChange = (e)=>{
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleRegister = async(e)=>{
        e.preventDefault()
        const {username, email, password, confirmPass} = state;
        if(!username || !email || !password) return toast.error('All fields are required')
        if(password.length <4 || password !== confirmPass) return toast.error('Both password should match and of at least 4 characters')
    
        try{
            let res = await axios.post(`/api/auth/register`,{username, email, password})
            toast.success(res?.data?.message)
            router.push('/login')
        }catch(error){
            toast.error(error?.response?.data?.message)
        }
        


    }

  return (
    <div className='w-full flex flex-wrap p-5 mt-10'>
        <div className='w-full md:w-1/2 p-8'>
        <h1 className='text-5xl font-bold mb-8'>Sign Up</h1>
        <h4 className='text-2xl'>Dive in to BeeLog by creating you new account with us.</h4>
        <p className="my-5 text-neutral-500">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com"
        </p>
        </div>
        <div className='w-full md:w-1/2 p-8 shadow-lg rounded-lg'>
            <form onSubmit={handleRegister}>
                <h1 className="text-3xl text-neutral-600 mb-4 text-center">Enter minimal details to continue.</h1>
                <hr></hr>
                <label>Name</label>
                <input name="username" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='text' placeholder='enter your name'/>
                <label>Email</label>
                <input name="email" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='email' placeholder='enter your email'/>
                <label>Password</label>
                <input name="password" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='password' placeholder='enter password'/>
                <label>Confirm Password</label>
                <input name="confirmPass" onChange={handleChange} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='password' placeholder='confirm password'/>
                <div className="flex justify-end">
                <button className="py-3 px-10 shadow rounded-lg bg-orange-400" type="submit">Sign Up</button>
                </div>
                
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Signup