import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {

  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });


  let { registerUser , errors } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the loginUser function with formData
    const response = await registerUser(formData);
    if (response && response.error) {
      // setErrors(response.error);
    } else {
      // setErrors({});
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container w-[100vw] h-[calc(100vh-64.8px)] m-auto flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <div className="form-control w-[80%] max-w-xs relative ">
          <h1 className="text-center text-3xl">Register</h1>
          <br />
          <span className="fa-solid fa-user text-xl absolute bottom-2 left-2 text-white "></span>
          {errors && errors.username && <div className="text-red-700 text-sm">{errors.username}</div>}
          {errors && errors.email && <div className="text-red-700 text-sm">{errors}</div>}
          {errors && errors.phone && <div className="text-red-700 text-sm">{errors}</div>}
          {errors && errors.password && <div className="text-red-700 text-sm">{errors.password}</div>}
          {errors && errors.confirm_password && <div className="text-red-700 text-sm">{errors.confirm_password}</div>}
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative ">
          <span className="fa-solid fa-user text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative ">
          <span className="fa-regular fa-envelope text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative ">
          <span className="fa-solid fa-phone text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative">
          <span className="fa-solid fa-lock text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-control w-[80%] max-w-xs relative">
          <span className="fa-solid fa-lock text-xl absolute bottom-2 left-2 text-white "></span>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="input input-bordered w-full h-11 max-w-xs pl-8 opacity-40 text-black"
            onChange={handleChange}
          />
        </div>
        <br />
        <button className="btn opacity-80 w-[32%] rounded-xl" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
