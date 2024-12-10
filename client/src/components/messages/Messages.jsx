
import Message from "./Message";
import { useEffect, useRef } from "react";

import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useSelector } from "react-redux";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
	const messages = useSelector((state) => state.conversation.messages)

  const { loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef();
   
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView(
        { block: "end" }
      );
    }, 100);
  }, [messages]);
	// console.log(messages)
	return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div
            key = {message?._id}
            ref={lastMessageRef}
            >
            <Message
              message={message}
            />
          </div>
        ))}
      {loading && <MessageSkeleton />}
      {!loading &&
        messages.length === 0 && (
          <p className='text-center text-white'>
            Send a message to start the
            conversation
          </p>
        )}
    </div>
  );
};
export default Messages;
// {
//   !loading &&
//     messages?.length > 0 &&
//     messages.map((message) => {
//       <Message
//         key={message._id}
//         message={message}
//       />;
//     });
// }