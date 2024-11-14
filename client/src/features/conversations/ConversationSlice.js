import { createSlice } from "@reduxjs/toolkit";







const conversationSlice = createSlice({
    name: 'conversation',
    initialState: { selectedConversation: null, messages: [] ,user: null },
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
        setMessages: (state, action) => {

            state.messages.push(action.payload)
        },
        setArrayMessages: (state, action) => { 
            state.messages = action.payload
        },
        setUsers: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setSelectedConversation, setMessages, setArrayMessages,setUsers } = conversationSlice.actions
export default conversationSlice.reducer