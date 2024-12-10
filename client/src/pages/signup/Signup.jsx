import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import {useState} from 'react'
import useSignup from "../../hooks/useSignup";
const SignUp = () => {
	const [signupData, setSignupData] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: ""
	})
	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignupData({ ...signupData, [name]: value })
		
	}

	const {loading, signup} = useSignup()	
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(signupData)
		await signup(signupData);

	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-2xl font-bold text-center text-white'>
					Sign Up <span className='text-sky-100'>Cognico ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base text-white label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='Enter Full Name' name='fullName' value={signupData.fullName} onChange={handleChange} className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base text-white label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' name='username' value={signupData.username} onChange={handleChange} className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base text-white label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							name='password'
							value={signupData.password}
							onChange={handleChange}
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base text-white label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							name='confirmPassword'
							value={signupData.confirmPassword}
							onChange={handleChange}
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox handleChange={handleChange} />

					<Link className='text-sm text-white hover:underline hover:text-blue-200 mt-2 inline-block' to='/login'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-sky-300'
							disabled={loading}>{loading ? <div className="loading"/> : 'Sign Up'}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
