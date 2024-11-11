import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    // email: {
    //     type: String,
    //     required: true
    // }
    // ,
    gender: {
        type: String,
        enum : ['male', 'female'],
        required: true
    },
    profilePic: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
export default User