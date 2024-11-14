
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";
const Conversations = () => {
	const {loading,conversations} = useGetConversation()
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{loading
				?
				<div className="flex justify-center items-center h-screen">
					<div className="loading loading-spinner  w-1/2 "></div>
					</div>
				:
				(
					conversations.map((conversation) => {
						return <Conversation key={conversation._id} conversation={conversation} getEmoji={getRandomEmoji()} />
					})
				)
			}
		</div>
	);
};
export default Conversations;
