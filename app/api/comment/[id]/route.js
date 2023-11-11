import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwt";
import Comment from "@/models/Comment";

export const GET = async(req, ctx)=> {
    try{
        await connectMongoDB()

        const id = ctx.params.id
        const comments = await Comment.find({blogId: id}).populate('authorId')

        return NextResponse.json({data: comments}, { status: 200 })
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
        const comment = await Comment.findById(id).populate("authorId")
        if(comment.authorId._id.toString() !== decodedToken._id.toString()){
            return NextResponse.json({ message: "unauthorized author." }, { status: 403 });
        }

        await Comment.findByIdAndDelete(id)

        return NextResponse.json({message: "Blog deleted successfully."}, { status: 200 })
    }catch(error){
         return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}