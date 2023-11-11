
import Link from 'next/link'
import BlogImage from './BlogImage'
import { format } from 'timeago.js';

const BlogCard = ({item}) => {

  return (
    <Link href={`/blog/${item?._id}`} className='w-full md:w-1/2 p-8 cursor-pointer hover:scale-105 transition-all'>
        <div className='flex'>
            <BlogImage media={item?.mediaUrl}/>
            <div className='w-full p-5 rounded-lg shadow-lg h-[160px] mt-5 -ml-52 glass overflow-hidden'>
            <h3 className='text-xl'>{item?.title}</h3>
            <p className='font-light text-neutral-500 mb-3'>{format(item?.createdAt)}</p>
            <p className='font-light'>{item?.desc} </p>
            </div>
        </div>
    </Link>
  )
}

export default BlogCard