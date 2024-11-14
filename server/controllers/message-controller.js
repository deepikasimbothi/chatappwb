
import Conversation from '../models/conversation-model.js'
import Message from '../models/message-model.js'
import { io, getReceiverSocketId } from '../socket/socket.js'

// POST api/messages/send:id


export const sendMessage = async (req, res) => { 
    try {
      console.log(
        "i entered sendmessage controller"
      );
      const { message } = req.body;
      const { id: ReceiverId } =
        req.params;
      const senderId = req.user._id;
      console.log(
        "req.user:",
        req.user
      ); //OUtput req.user: new ObjectId('673350efa9b0ba8697821990')
      console.log(
        "receiverId:",
        ReceiverId
      );// output receiverId: 673350efa9b0ba8697821990
      let conversation =
        await Conversation.findOne({
          participants: {
            $all: [
              senderId,
              ReceiverId,
            ],
          },
        });
      if (!conversation) {
        conversation =
          await Conversation.create({
            participants: [
              senderId,
              ReceiverId,
            ],
          });
      }

      const newMessage = new Message({
        sender: senderId,
        receiver: ReceiverId,
        message: message,
      });

      if (!newMessage) {
        return res
          .status(404)
          .json({
            msg: "message not found",
          });
      }
      conversation.messages.push(
        newMessage
      );

      await Promise.all([
        newMessage.save(),
        conversation.save(),
      ]);

      const receiverSocketId =
        getReceiverSocketId(ReceiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "newMessage",
          newMessage
        );
      }
      res.status(200).json(newMessage);
    }
    catch (e) {
        console.log('error in send message controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }
}

// GET api/messages/:id

export const getMessage = async (req, res) => { 
    try {
        console.log('entering getMesage controller')
        const { id: chatToUserId } = req.params;
        const conversation = await Conversation.findOne({ participants: { $all: [req.user._id, chatToUserId] } }).populate('messages')
        if (!conversation) {
            return res.status(200).json([])
        }
        const messages = conversation.messages
        console.log('messages in controller', messages)
        
        res.status(200).json({ messages })
    
    }
    catch (e) {
        console.log('error in get message controller', e.message)
        res.status(500).json({ msg: 'server error' })
    }

}