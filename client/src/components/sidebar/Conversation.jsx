import { useSelector, useDispatch } from 'react-redux'
import { setSelectedConversation } from '../../features/conversations/ConversationSlice';
import { useSocketContext } from '../../context/socketContext';

const Conversation = ({ conversation , getEmoji }) => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)

  const dispatch = useDispatch()
  
  const { onlineUsers } = useSocketContext()
  console.log('onlineUsers',onlineUsers)
  const isOnline = onlineUsers.includes(conversation._id)
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-[#e670707c] rounded p-2 py-1 cursor-pointer ${
          selectedConversation?._id ===
          conversation._id
            ? "bg-[#e67070cb]"
            : ""
        }`}
        onClick={() =>
          dispatch(
            setSelectedConversation(
              conversation
            )
          )
        }>
        <div className={`avatar  ${isOnline ? 'online' : ''}`}>
          <div className='w-12 rounded-full'>
            <img
              src={
                conversation.profilePic
              }
              alt='user avatar'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>
              {conversation.fullName}
            </p>
            <span className='text-xl'>
              {getEmoji}
            </span>
          </div>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1' />
    </>
  );
};
export default Conversation;
