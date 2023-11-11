"use client"
import { useState, useEffect } from 'react';
import SingleBlogImg from './SingleBlogImg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import SingleBlogComment from './SingleBlogComment';

const SingleBlog = () => {
  const {id} = useParams()
  const {token} = useSelector(store => store.auth)
const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async()=>{
    setLoading(true)
    try{
      let res = await axios.get(`/api/blog/${id}`)
      setData(res?.data?.data)
      
    }catch(error){
    toast.error(error?.response?.data?.message)
    }
    
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])

  const handleDelete = async()=>{
    try{
      await axios.delete(`/api/blog/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Deleted Successfully")
      router.push('/')
    }catch(error){
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='w-full'>
      {loading ?
    <h1 className='text-center p-10'>Loading blog posts....</h1>
    :
    data &&
    <SingleBlogImg data={data} handleDelete={handleDelete}/>
    }
    <SingleBlogComment/>
        
        <ToastContainer/>  
    </div>
  )
}

export default SingleBlog