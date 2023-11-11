"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {MdPermMedia} from 'react-icons/md'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
    const {user, token} = useSelector(store => store.auth)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [media, setMedia] = useState('')
    const [mediaUrl, setMediaUrl] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async()=>{
        if(!title || !description || !media) return toast.error('All fields are required')
        setLoading(true)
        let type;
        if(media?.type?.includes('image')){
            type = 'image'
        }else{
            type = 'video'
        }
        const formData = new FormData()
        formData.append('file', media)
        formData.append('upload_preset', 'Blog_preset')
        try{
            let res = await axios.post(`https://api.cloudinary.com/v1_1/dgl8zmniq/${type}/upload`, formData)
            if(res?.data?.secure_url){
                setMediaUrl(res?.data?.secure_url)
            }
            
                let data = {
                    title,
                    desc:description,
                    mediaUrl:res?.data?.secure_url || null,
                    authorId:user?._id
                }
            let response = await axios.post(`/api/blog`, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response?.data){
                toast.success('Blog post added successfully.')
                router.push('/')
            }
        }catch(error){
            toast.error(error?.response?.data?.message || error?.message)
        }

        
        setLoading(false)
    }



  return (
    <div className='w-full flex flex-wrap p-5 mt-10 mb-48'>
        <div className='w-full md:w-1/2 p-8'>
        <h1 className='text-5xl font-bold mb-8'>Create a blog</h1>
        <h4 className='text-2xl'>share your knowledge to the community out there.</h4>
        <p className="my-5 text-neutral-500">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com"
        </p>
        </div>
        <div className='w-full md:w-1/2 p-8 shadow-lg rounded-lg'>
            <div>
                <h1 className="text-3xl text-neutral-600 mb-4 text-center">Blog creation</h1>
                <hr></hr>
                <label>Title</label>
                <input onChange={e=>setTitle(e.target.value)} value={title} className='w-full rounded-lg h-[40px] border-2 px-2 border-slate-400 mb-5' type='text' placeholder='enter title'/>
                <label>Description</label>
                <textarea onChange={e=>setDescription(e.target.value)} value={description} className='w-full rounded-lg h-[120px] border-2 px-2 border-slate-400 mb-5' placeholder='enter description'/>
                
                <input style={{display:'none'}} type="file" id="file" accept="image/*,video/*" onChange={e=>setMedia(e.target.files[0])}/>
                <label htmlFor="file">
                    {media && media?.type?.includes('video') ?
                    <video className="w-full h-[180px] object-cover rounded-lg" src={URL.createObjectURL(media)} controls/> 
                :
                    media ?
                    <img src={URL.createObjectURL(media)} alt="image" className="w-full h-[180px] object-cover rounded-lg"/>
                    :
                    <MdPermMedia size={40} className="cursor-pointer"/>

                }
                </label>

                <div className="flex justify-end mt-5">
                <button className="py-3 px-10 shadow rounded-lg bg-orange-400" onClick={handleSubmit}
                disabled={loading}
                >Create</button>
                </div>
                
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default CreateBlog