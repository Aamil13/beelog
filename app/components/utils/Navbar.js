"use client"
import { logout } from '@/redux/authSlice';
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
    window.location.href='/'
  }

  return (
    <div className='w-full flex justify-between p-5 shadow-lg bg-white'>
        <Link href='/' className='text-xl font-bold'>B<span className='text-orange-400'>ee</span>Log</Link>

    {user?._id ?
    <div className='flex'>
    <Link href='/blog/create' className='mr-4'>Create a blog</Link>
    <h3 className='cursor-pointer' onClick={handleLogout}>Logout</h3>
    </div>
  :
<div className='flex'>
        <Link href='/signup' className='mr-4'>SignUp</Link>
        <Link href='/login'>Login</Link>
        </div>
  }
        
    </div>
  )
}

export default Navbar