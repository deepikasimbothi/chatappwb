import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector,useDispatch } from 'react-redux';
import { setArrayMessages } from '../features/conversations/ConversationSlice';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
    const dispatch = useDispatch()
    // console.log('selectedConversation',selectedConversation)
    const getMessages = async () => {
        setLoading(true);
        try {
            const data = await axios.get(`/api/messages/${selectedConversation._id}`)
            if (data.error) {
                throw new Error(data.error)
            }
            // console.log(data.data)
            if(data.data.length === 0) dispatch(
              setArrayMessages(
                data.data
              )
            );
            else{dispatch(
              setArrayMessages(
                data.data.messages
              )
            );}
            
        } catch (e) {
            console.log("error in use getMessages",e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { 
        
        if (selectedConversation?._id) getMessages();
        
    }, [selectedConversation?._id])

    return {loading}
}

export default useGetMessages