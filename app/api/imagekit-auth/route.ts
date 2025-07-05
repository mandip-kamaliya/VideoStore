/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUploadAuthParams } from "@imagekit/next/server"
 export async function GET() {

    try {  
        const authenticparameter = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
           
        })
    
        return Response.json({authenticparameter, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
    }
 catch (error) {
            return Response.json({ error: "Authentication for Imagekit failed",},{status:500});

}
 }