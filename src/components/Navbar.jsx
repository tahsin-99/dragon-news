import React, { use } from "react";
import { Link, NavLink } from "react-router";
import userProfile from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const handleLogout = () => {
    // console.log("user trying to logout");
    logOut()
      .then(() => {
        alert("Logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="">{user && user.email}</div>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/career">Career</NavLink>
      </div>
      <div className="login-btn flex gap-5">
        <img
          className="w-[45px] rounded-full"
          src={`${user ? user.photoURL : userProfile}`}
          alt=""
        />
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary px-10">
            Logout
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-primary px-10 ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
