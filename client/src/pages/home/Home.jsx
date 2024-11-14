import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../login/Login";

const Home = () => {
  return (
     <div className='p-4 h-screen flex items-center justify-center '>
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow shadow-white/30'>
      <Sidebar /> 
      <MessageContainer />
      

    </div>
      
    </div>
  );
};
export default Home;
