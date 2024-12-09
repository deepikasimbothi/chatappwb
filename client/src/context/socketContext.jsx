import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./authContext";     
import { io } from "socket.io-client";
import { useContext } from "react";


const serverApiUrl = import.meta.env.DEV ? "https://chatappweb-he6e.onrender.com" : "/";
const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user}= useAuthContext();


    useEffect(() => { 
        if (user) {
          const socket = io(
            serverApiUrl,
              {
                  query: {
                    userId: user._id,
                    }
            }
          );
          setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
              setOnlineUsers(users);
            })
          

          return () =>  socket.close();
          
        } else {
          if (socket) socket.close();
          setSocket(null);
          
        }
    }, [user])
    
    return (
        <SocketContext.Provider value={{onlineUsers,socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export { useSocketContext, SocketContextProvider }