import mongoose from "mongoose";
import env from "dotenv";

env.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("connection successful"))
.catch((err)=> console.log("connection failed"));

const userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
});

export const User = new mongoose.model("User", userschema);

// module.exports = User;