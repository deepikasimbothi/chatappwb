import { useState } from 'react';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { setMessages } from '../features/conversations/ConversationSlice';


const useSendMessage = () => { 
    const [loading, setLoading] = useState(false);
    const selectedConversation = useSelector((state)=>state.conversation.selectedConversation)
    const dispatch = useDispatch()
    const sendMessage = async ({ message }) => {
        setLoading(true);
        // console.log("receiver id: ",selectedConversation._id)
        try {
            const data = await axios.post(`/api/messages/send/${selectedConversation._id}`, {
                message
            })
            if (data.error) {
                throw new Error(data.error)
            }
            // console.log(data)
            dispatch(setMessages(data.data))
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading,sendMessage}
 }

export default useSendMessage