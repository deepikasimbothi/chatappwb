import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../../features/conversations/ConversationSlice";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";
const MessageContainer = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
  const dispatch = useDispatch()
 useEffect(() => {
   // cleanup function (unmounts)
   return () =>
     dispatch(setSelectedConversation(null));
 }, [setSelectedConversation]);
	return (
    <div className='md:min-w-[450px] flex flex-col'>
      {selectedConversation ? (
        <>
          {/* Header */}
          <div className='bg-[#fff8f800] shadow-xl px-4 py-2 mb-2'>
            <span className='label-text text-lg'>
              To:
            </span>{" "}
            <span className='text-white font-bold pl-1'>
              {selectedConversation?.fullName.toUpperCase()}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
   const { user } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>
          Welcome 👋 {user.fullName}{" "}
          ❄
        </p>
        <p>
          Select a chat to start
          messaging
        </p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};