import { BsSend } from "react-icons/bs";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
	const [message, setMessage] = useState("");
	const {loading,sendMessage} =useSendMessage();
	const handleClick = async () => {
		// console.log(message)
		if (!message) return;
		await sendMessage({ message });
		setMessage("");

	}
	return (
		<form className='px-4 my-3'>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-white outline-none border-gray-400 text-black'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'
					onClick={handleClick}
				disabled={loading}>
					{loading ? <span className='loading loading-dots'></span> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
