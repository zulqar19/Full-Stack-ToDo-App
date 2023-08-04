import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 w-[100vw]">
      <div className="navbar-start md:pl-24">
        {user ? <Link to="/" className="text-2xl">Todo</Link> : <p className="fa-solid fa-house text-lg "></p> }
      </div>
      <div className="navbar-center">
        {user ? null : <h1 className="text-2xl">Todo</h1> }
        
      </div>
      <div className="navbar-end">
        <div className="form-control md:pr-6">
          {user ? <p>Logged in as: {user.username}</p> : null}
        </div>
        <div className="dropdown md:pr-24">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <span className="fa-solid fa-user text-lg"></span>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content md:pr-24 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28 left-[-70px]"
          >
            {user ? (
              <li className="w-[7vw]">
                <p>{user.username}</p>
              </li>
            ) : (
              <li className="w-[7vw]">
                <Link to="/register">Register</Link>
              </li>
            )}
            {user ? (
              <li className="w-[7vw]">
                <p onClick={logoutUser}>Logout</p>
              </li>
            ) : (
              <li className="w-[7vw]">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
