import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../features/conversations/ConversationSlice";
import useGetConversation  from "../../hooks/useGetConversation";
import { toast } from "react-hot-toast";


const SearchInput = () => {
	const { conversations } = useGetConversation()
	const [search, setSearch ] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(search)
		if (!search) toast.error('Please enter a user')
		if (search.length < 3) toast.error('Please enter at least 3 characters')
		dispatch(setSelectedConversation(conversations.find((c) => c.fullName.toLowerCase() === search.toLowerCase())))
	}
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full'
				value={search}
			onChange={(e) => setSearch(e.target.value)}/>
			<button type='submit' className='btn btn-circle bg-blue-600/70 hover:bg-blue-400/90 hover:scale-105 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none ' />
			</button>
		</form>
	);
};
export default SearchInput;
