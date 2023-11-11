"use client"
import { useSelector } from "react-redux"
import {AiFillDelete} from 'react-icons/ai'

const SingleAction = ({authorId, handleDelete}) => {
  const {user} = useSelector(store => store.auth)

    return (
    <>
    { user?._id === authorId &&
        <div className="flex justify-end">
        <button className="px-2 text-red-500 border-none" onClick={handleDelete}><AiFillDelete size={24}/></button>
        </div>
    }
    </>
  )
}

export default SingleAction