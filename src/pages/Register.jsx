import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const [nameError, setNameError] = useState("");

  const navigate=useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setNameError("Name Should be atleast five cheracter");
      return;
    } else {
      setNameError("");
    }
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({...user,displayName: name, photoURL: photo });
         navigate('/')
        }) 
        .catch((error) => {
        console.log(error);
        setUser(user)
      });
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-10">
        <h1 className="font-semibold text-2xl text-center">Register Now</h1>
        <div className="card-body py-5">
          <form onSubmit={handleRegister} action="">
            <fieldset className="fieldset">
              <label className="label">Your Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Enter Your Name"
                required
              />

              {nameError && <p className="text-xs text-red-500">{nameError}</p>}

              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Password"
                required
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter Your Email"
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Enter Your Password"
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
              <p className="font-semibold text-center pt-5">
                Already have an account ?{" "}
                <Link className="text-secondary" to="/auth/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
