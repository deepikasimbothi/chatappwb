import { useEffect } from "react";


import { useSocketContext } from "../context/socketContext.jsx";
import {useSelector , useDispatch} from 'react-redux'
import { setMessages } from "../features/conversations/ConversationSlice";


import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversation);
  const dispatch = useDispatch()
  // const { setMessages } = useConversation();

  useEffect(() => {
    socket?.on(
      "newMessage",
      (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(
          notificationSound
        );
        sound.play();
        dispatch(setMessages(
          newMessage
        ));
      }
    );

    return () =>
      socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
