import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const generateTokenAndSetCookie = (userId, res) => {

    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:"1d",
    })

    res.cookie('jwt', token, {
        httpOnly: true, //XSS protection
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict', // CSRF protection
        maxAge: 24 * 60 * 60 * 1000 
        
    })
 }

export default generateTokenAndSetCookie;