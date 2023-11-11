"use client"
import { useEffect, useState } from 'react';
import BlogCard from './BlogCard'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Blogs = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async()=>{
    setLoading(true)
    try{
      let res = await axios.get('/api/blog')
      setData(res?.data?.data)
      
    }catch(error){
    toast.error(error?.response?.data?.message)
    }
    
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <>
    {loading ? 
    <h1 className='text-center p-10'>Loading blog posts....</h1>
  :
    <>
    <h1 className='text-center text-5xl text-neutral-700 mt-10'>B<span className='text-orange-400'>ee</span>Log</h1>
    <h4 className='text-center text-xl text-neutral-500 mb-5'>One stop solution for your daily updates</h4>
    <div className='p-5 flex justify-center flex-wrap'>
      {data?.map((item, index)=>(
        <BlogCard key={index} item={item}/>
      ))}

    </div>
    </>
}
<ToastContainer/>
    </>
  )
}

export default Blogs