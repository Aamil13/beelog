
import SingleAction from "./SingleAction"
import { format } from 'timeago.js';

const SingleBlogImg = ({data, handleDelete}) => {
  return (
    <div className='w-full'>
      {data?.mediaUrl?.includes("image/upload") ?
       <img src={data?.mediaUrl} alt='blog image' className="w-full h-[360px] object-cover rounded-lg"
       /> 
    :
<video src={data?.mediaUrl} className="w-full h-[360px] object-cover rounded-lg" controls/>
    }
<div className="mt-5">
<h1 className="text-2xl">{data?.title}</h1>

<h3 className="text-neutral-500">{format(data?.createdAt)}</h3>
</div>
<SingleAction authorId={data?.authorId?._id} handleDelete={handleDelete}/>
<p className="">{data?.desc}</p>
    </div>
  )
}

export default SingleBlogImg