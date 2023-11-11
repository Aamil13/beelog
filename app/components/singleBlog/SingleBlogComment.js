"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {format} from 'timeago.js'

const SingleBlogComment = () => {
    const {id} = useParams()
  const {token, user} = useSelector(store => store.auth)

    const [com, setCom] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async()=>{

        try{
          let res = await axios.get(`/api/comment/${id}`)
          console.log('res, com', res)
          setData(res?.data?.data)
          
        }catch(error){
        toast.error(error?.response?.data?.message)
        }
        

      }

      const postComment = async()=>{
        if(!com) return toast.error('Write few words to continue.')
        setLoading(true)
        try{
            let body = {
                blogId:id,
                authorId:user?._id,
                text:com
            }
            console.log('body', body)
            await axios.post(`/api/comment`, body, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            }).then(()=>{
                getData()
                setCom('')
            })
            
        }catch(error){
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)

      }

      useEffect(()=>{
        getData()
      },[])

  return (
    <div className='w-full p-5'>
        <h1 className='text-xl'>Comments:</h1>
        <hr></hr>
        <div className='flex items-center mb-3 w-full'>
        <div className='w-[90%]'>
            <label>Post Comment</label>
            <input onChange={e => setCom(e.target.value)} value={com} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='text' placeholder='enter your comment'/>
        </div>
        <div className=''>
            <button className='p-3 rounded-lg shadow bg-sky-400 w-[120px] h-[40px] text-white'
            onClick={postComment}
            disabled={loading}
            >Post</button>
        </div>
        </div>
        <div className='w-full'>
        {data?.map((item, index)=>(
            <div className='w-full p-3 rounded shadow-lg bg-white mb-3' key={index}>
                <p className='text-lg font-bold'>{item?.text}</p>
                <p className='text-neutral-500 mb-3'>{format(item?.createdAt)}</p>
                <div className='flex justify-end'>
                <p className='font-light'>By: {item?.authorId?.username}</p>
                </div>
            
            </div>
        ))}
        </div>
        
        <ToastContainer/>
    </div>
  )
}

export default SingleBlogComment