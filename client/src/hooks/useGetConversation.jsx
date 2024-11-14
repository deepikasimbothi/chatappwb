import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";



const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);



    const getConversation = async () => { 
        setLoading(true);
        try {
            
            const data = await axios.get('/api/users/')

            // console.log(data.data.users)
            if (data.error) {
                throw new Error(data.error);
            }
            setConversations(data.data.users)
        }
        catch (e) {
            toast.error(e.message)
            console.log('error in get conversation', e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getConversation();
    }, [])
    
return {loading,conversations}
 }

export default useGetConversation

