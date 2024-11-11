import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => { 
    try {
        mongoose.connect(process.env.URI)
        console.log("connected to db success")
     }
    catch (e) {
        console.error(e.message)
    }

}

export default connectDb;