
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import bcrypt from 'bcrypt';

export const POST = async(req)=>{
    const {username, email, password:pass} = await req.json()
    try{
        await connectMongoDB()
        const isExisting = await User.findOne({email})

        if(isExisting){
            return NextResponse.json({ message: "Account already exists with this email." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await User.create({username, email, password: hashedPassword})

        const {password, ...user} = newUser._doc
        return NextResponse.json({ message: "Account created successfully. Login to continue" }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: "Internal server error. Please try later." }, { status: 500 });
    }
}