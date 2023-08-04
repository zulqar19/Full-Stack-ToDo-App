import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <>
      <form onSubmit={loginUser} className="container w-[100vw] h-[calc(100vh-64.8px)] m-auto flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="form-control w-[80%] max-w-xs relative ">
          <h1 className="text-center text-3xl">Login</h1>
          <br />
          <span className="fa-solid fa-user text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="text"
            name='username'
            placeholder="Username"
            className="input input-bordered w-full max-w-xs pl-8 opacity-40 text-black"
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative">
          <span className="fa-solid fa-lock text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="password"
            name='password'
            placeholder="Password"
            className="input input-bordered w-full max-w-xs pl-8 opacity-40 text-black"
          />
        </div>
        <br />
        <button className="btn opacity-80 w-[32%] rounded-xl" type='submit'>Login</button>
      </form>
    </>
  );
};

export default LoginPage;
