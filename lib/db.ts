import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("please provide mongodb uri");
}
let cached=global.mongoose;

if(!cached){
   cached= global.mongoose={conn:null,promise:null}
}

export async function connectDB(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise= mongoose.connect(MONGODB_URI).then(()=>mongoose.connection)
    }
    try {
       cached.conn=await cached.promise
    } catch(error) {
        cached.promise=null;
    throw error
}
    return cached.conn;
}
