import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwt";
import Blog from "@/models/Blog.js";

export const GET = async()=>{
    try{
        await connectMongoDB()
        const blogs = await Blog.find({}).populate("authorId").select('-password')
        return NextResponse.json({ data: blogs }, { status: 200 });
    }catch(error){
        console.log('eee', error)
        return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}

export const POST = async(req)=> {
    try{
        await connectMongoDB()
        const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return NextResponse.json({ message: "unauthorized (wrong or expired token)" }, { status: 403 });
    }
    const body = await req.json()
        const newBlog = await Blog.create(body)

        return NextResponse.json({data: newBlog}, { status: 201 })
    }catch(error){
        console.log('err', error)
        return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}
