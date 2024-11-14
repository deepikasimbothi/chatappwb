import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'
// import { useDispatch } from 'react-redux'
// import {setUsers} from '../features/conversations/ConversationSlice'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setUser } = useAuthContext()
    // const dispatch = useDispatch()
    const login = async ({ username, password }) => {
        
        const success = checkInputs({
            username,
            password
        })
        if (!success) return;
        setLoading(true);
        try {

            const data = await axios.post('/api/auth/login', {
                username,
                password
            })
            console.log("uselogin user data", data.data)
            
            if(data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem('chat-user', JSON.stringify(data.data))
            
            setUser(data.data)
            // dispatch(setUsers(data.data))
            toast.success('Login Successful')
            
        }catch (e) {
            console.log('error in useLOgin: ',e.message)
        } finally {
            setLoading(false)
        }
    } 
    return {loading,login}
}

const checkInputs = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill in all fields")
        return false
    }
    if(password.length < 6) {    
        toast.error("password must larger than 6 character")
        return false
    }
    return true
}

export default useLogin