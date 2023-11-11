import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwt";
import Comment from "@/models/Comment";

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
        let newComment = await Comment.create(body)
        newComment = await newComment.populate('authorId')

        return NextResponse.json({data: newComment}, { status: 201 })
    }catch(error){
        return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}
