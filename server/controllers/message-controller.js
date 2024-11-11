
import Conversation from '../models/conversation-model.js'
import Message from '../models/message-model.js'

// POST api/messages/send:id


export const sendMessage = async (req, res) => { 
    try { 
        console.log('i entered sendmessage controller')
        const { message } = req.body;
        const { id:ReceiverId } = req.params;
        const senderId = req.user._id;
        console.log('req.user:', req.user)

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, ReceiverId] } })
        if(!conversation) {
             conversation =  await  Conversation.create({
                participants: [senderId, ReceiverId],
            })
        }

        const newMessage =  new Message({
            sender: senderId,
            receiver: ReceiverId,
            message :message
        })

        if(!newMessage) {    
            return res.status(404).json({ msg: 'message not found' })
        }
         conversation.messages.push(newMessage)

        await Promise.all([
            newMessage.save(),
            conversation.save()
        ])
        res.status(200).json({ msg: 'message sent' })
    
    }
    catch (e) {
        console.log('error in send message controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }
}

// GET api/messages/:id

export const getMessage = async (req, res) => { 
    try {
        const { id: chatToUserId } = req.params;
        const conversation = await Conversation.findOne({ participants: { $all: [req.user._id, chatToUserId] } }).populate('messages')
        if (!conversation) {
            return res.status(404).json([])
        }
        const messages = conversation.messages
        res.status(200).json({ messages })
    
    }
    catch (e) {
        console.log('error in get message controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }

}