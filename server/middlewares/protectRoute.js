import jwt from 'jsonwebtoken'
import User from '../models/user-model.js'
import dotenv from 'dotenv'

dotenv.config()
export const protectRoute = async (req, res, next) => { 
    try { 
        console.log('i entered protectroute')
        const token = req.cookies.jwt;
        if (!token) {
           return res.status(401).json({ msg: 'unauthorized : no token' })
        }
        const verify = await jwt.verify(token, process.env.JWT_SECRET);
        console.log('id:',verify.userId)
        
        if (!verify) {
            return res.status(401).json({ msg: 'unauthorized: invalid token' })
        }
        const user = await User.findById(verify.userId)
        if (!user) {
            return res.status(401).json({ msg: 'unauthorized: user not found' })
        }
        // console.log(user)
        req.user = user._id
        // console.log('req.user:', req.user)
        next();


    }
    catch (e) {
        console.log('error in protect route middleware', e.message)
        res.status(500).json({ msg: 'server error' })
    }
}
