import { createContext,useContext,useState } from "react";

const authContext = createContext();

const useAuthContext = ()=> useContext(authContext);

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    console.log('authcontext userdata: ',user)         
    return <authContext.Provider value={{user , setUser}}>
        {children}
    </authContext.Provider>
}

export {AuthContextProvider , useAuthContext}