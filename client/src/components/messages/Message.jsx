import { useSelector } from "react-redux";
import {useAuthContext} from '../../context/authContext'
import {extractTime} from '../../utils/extractTime'
const Message = ({ message }) => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
  const { user } = useAuthContext();

  //  console.log("user in message component", user.profilePic);
  const mineUser = message.sender === user._id;
  // console.log("message: ",message)
// console.log('message user data: ',user)
  const formattedTime = extractTime(
    message.createdAt
  );
  const profilePic = mineUser ? user.profilePic : selectedConversation.profilePic;
  const chatClassName = mineUser ? 'chat-end' : 'chat-start'
  const bubbleBgColor = mineUser
    ? "bg-gray-900 "
    : "bg-gray-950";
  // console.log('inside message component')
//  console.log("message in message component", message,mineUser, chatClassName,user)

  const shakeClass = message.shouldShake
    ? "shake"
    : "";
  return (
    <div
      className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Tailwind CSS chat bubble component'
            src={profilePic}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor}  ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-80 text-xs flex gap-1 items-center'>
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
