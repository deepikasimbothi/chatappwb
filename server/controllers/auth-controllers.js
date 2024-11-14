import User from "../models/user-model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


// POST api/auth/signup

export const signup = async (req,res) => {
    try {
        
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({ msg: "passwords do not match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            console.log('user already exists')
            return res.status(400).json({ msg: "user already exists" })
        }
        //hashPassword
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        //Profile Pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const profilePic = gender === 'male' ? boyProfilePic : girlProfilePic;


        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic
        })
        if (newUser) {
             generateTokenAndSetCookie(
               newUser._id,
               res
             );
            await newUser.save();
          
             res.send({
               _id: newUser._id,
               fullName:
                 newUser.fullName,
               username:
                 newUser.username,
               profilePic:
                 newUser.profilePic,
             });

        } else {
            res.status(400).json({ msg: "invalid user data" })
        }
        

       

        
    }
    catch (e) {

        console.log('error in signup controller', e.message)
        res.status(500).json({ msg: 'server error' })    
    }
}


// POST api/auth/login

export const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "")
        
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ msg: "Username or Password is incorrect" })
            
        }

        generateTokenAndSetCookie(user._id, res);

        res.send({
            _id: user._id,
            fullName:
              user.fullName,
            username:
              user.username,
            profilePic:
              user.profilePic
        })
    }
    catch (e) {

        console.error('error in login controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }
}

// POST api/auth/logout

export const logout = async (req,res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ msg: "logout success" })
    }
    catch (e) {

        console.error("error in logout controller", e.message)
        res.status(500).json({ msg: "server error" })
    }
}

