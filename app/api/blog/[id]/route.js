import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwt";
import Blog from "@/models/Blog";



export const GET = async(req, ctx)=> {
    try{
        await connectMongoDB()

    const id = ctx.params.id
    const blog = await Blog.findById(id).populate('authorId').select('-password')

        return NextResponse.json({data: blog}, { status: 200 })
    }catch(error){
         return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}

export const PUT = async(req, ctx)=> {
    try{
        await connectMongoDB()
        const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return NextResponse.json({ message: "unauthorized (wrong or expired token)" }, { status: 403 });
    }
    const id = ctx.params.id;
    const body = await req.json()
    const blog = await Blog.findById(id).populate('authorId')

        if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
            return NextResponse.json({ message: "unauthorized author." }, { status: 403 });
        }
        const newBlog = await Blog.findByIdAndUpdate(id, body, {
            new:true
        })

        return NextResponse.json({data: newBlog}, { status: 201 })
    }catch(error){
         return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}

export const DELETE = async(req, ctx)=> {
    try{
        await connectMongoDB()
        const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return NextResponse.json({ message: "unauthorized (wrong or expired token)" }, { status: 403 });
    }
    const id = ctx.params.id
    const blog = await Blog.findById(id).populate('authorId')

        if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
            return NextResponse.json({ message: "unauthorized author." }, { status: 403 });
        }
        await Blog.findByIdAndDelete(id)
        return NextResponse.json({message: "Blog deleted successfully."}, { status: 200 })
    }catch(error){
         return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}