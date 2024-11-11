import User from "../models/user-model.js"


// GET api/users/

export const getAllUsers = async (req, res) => {
    try {
        const ownId = req.user._id
        const users = await User.find(({_id:{$ne:ownId}})).select('-password')
        res.status(200).json({ users })
    }
    catch (e) {
        console.log('error in get all users controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }
}