/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {connectDB} from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request:NextRequest){
    try {
        const {email,password} =await request.json();
    if(!email && !password){
        return NextResponse.json(
            {error:"email and password are required!!"},
            {status:400}
        );
    }
     await connectDB();
     const existinguser = User.findOne(email);
     if(!existinguser){
        return NextResponse.json(
            {error:"user already registered!"},
            {status:400}
        );
        User.create(
            email,
            password
        );
        return NextResponse.json(
            {message:"user registered successfully!!"},
            {status:400}
        )
     }
    } catch (error) {
        console.error("registration error",error);
        return NextResponse.json(
             {error:"registration error"},
            {status:400}
        );
    }
}