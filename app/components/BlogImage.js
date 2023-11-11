

const BlogImage = ({media}) => {
  return (
    <div className='w-full h-[200px]'>
        {media?.includes("image/upload") ?
       <img src={media} alt='blog image' className="width-[300px] h-[200px] object-cover rounded-lg"
       /> 
    :
<video src={media} className="width-[300px] h-[200px] object-cover rounded-lg" controls/>
    }
            
    </div>
  )
}

export default BlogImage