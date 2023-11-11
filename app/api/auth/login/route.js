
import { NextResponse } from "next/server";
import User from "@/models/User";
import { signJwtToken } from "@/utils/jwt";
import connectMongoDB from "@/utils/db";
import bcrypt from 'bcrypt';

export const POST = async(req) =>{
    const {email, password} = await req.json()
    try{
    await connectMongoDB()
    const user = await User.findOne({ email })
    if(!user){
       return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
    }
    const comparePass = await bcrypt.compare(password, user.password)

    if(!comparePass){
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
    } else {
        const {password, ...currentUser} = user._doc
        const accessToken = signJwtToken(currentUser, {expiresIn: '30d'})
        return NextResponse.json({currentUser, accessToken}, { status: 200 });
        // return {
        //     ...currentUser,
        //     accessToken
        // }
    }
    }catch(error){
        return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}

