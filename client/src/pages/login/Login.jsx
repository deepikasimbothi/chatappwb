import { Link } from 'react-router-dom'
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';
const Login = () => {
  const {loading,login}=useLogin()
		const [loginData, setLoginData] = useState({
			username: "",
			password: ""
		})
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value })
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		await login(loginData)

	}

	return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-blue-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-2xl font-bold text-center text-white'>
          Login
          <span className='text-sky-100'>
            {" "}
            Cognico ChatApp
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>
                Username
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              name='username'
              onChange={handleChange}
              value={loginData.username}
              className='w-full input input-bordered h-10'
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base  text-white label-text'>
                Password
              </span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={loginData.password}
              onChange={handleChange}
              className='w-full input input-bordered h-10'
            />
          </div>
          <Link
            to='/signup'
            className='text-sm  text-white hover:underline hover:text-blue-300 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2'
            disabled={loading}>
              {loading ? <span className="loading "></span> : 'Login'} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
