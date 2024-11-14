import {useState} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'

const useLogout = () => {   
    const [loading, setLoading] = useState(false)
    const { setUser } = useAuthContext();
    
    const logout = async () => {
        try {
            setLoading(true);
            const data = await axios.post('/api/auth/logout')
            // console.log(data)
            if(data.error) {
                throw new Error(data.error)
            }
            
            
            localStorage.removeItem('chat-user')
            setUser(null)
            setLoading(false)
            toast.success('Logout Successful')
        }
        catch (e) {
            console.log(e.message)
            toast.error(e.message           )
        } finally {
            setLoading(false)
        }
    }
    return {loading,logout}
}
export default useLogout