import { configureStore } from '@reduxjs/toolkit'

import conversationReducer from '../features/conversations/ConversationSlice'



const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        
    }
})

export default store