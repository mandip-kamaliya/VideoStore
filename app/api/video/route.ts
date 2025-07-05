/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/db";
import Video,{ IVideo } from "@/models/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(){
    try {
        await connectDB();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if(!videos || videos.length===0){ 
            return NextResponse.json(
                [],{status:200}
            );
            return NextResponse.json(videos);
        }
    } catch (error) {
        return NextResponse.json(
           { error: "Failed to fetch videos" },
      { status: 500 }
        )        
    }
}

export async function POST(request:NextRequest){
    try {
        const session = getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                erro:"unauthorized"
            },{status:500})
        }
        await connectDB();
        const body:IVideo = await request.json();
        if(
            !body.title ||
            !body.videoUrl ||
            !body.description ||
            !body.thumbnailUrl
        ){
            return NextResponse.json({
                error:"missing required fields"
            },{status:500})
        }
        const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };
     const newVideo = await Video.create(videoData);   
          return NextResponse.json(newVideo);

        
    } catch (error) {
        return NextResponse.json(
             { error: "Failed to create video" },
      { status: 500 }
    )
    }
}