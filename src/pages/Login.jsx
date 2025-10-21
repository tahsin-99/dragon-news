import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

  const [error,setError]=useState('')
    const {login}=use(AuthContext)
    const location=useLocation()
    const navigate=useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault()
        const form =e.target
        
        const email=form.email.value
      
        const password=form.password.value
        // console.log({email,password});
        login(email,password).then((result=>{
            const user=result.user;
            // console.log(user);
           navigate(`${location.state?location.state:'/'}`)

        }))
        .catch((error)=>{
          const errorCode=error.code
            setError(errorCode)
        })

    }
    return (
       <div className='flex justify-center items-center min-h-screen'>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-10">
        <h1 className='font-semibold text-2xl text-center'>Login Your Account</h1>
      <form onSubmit={handleLogin} className="card-body py-5">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" required />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" required />
          <div><a className="link link-hover">Forgot password?</a></div>
          {
            error && <p className='text-red text-xs'>{error}</p>
          }
          
          <button type='submit' className="btn btn-neutral mt-4">Login</button>
          <p className='font-semibold text-center pt-5'>Dont’t Have An Account ? <Link className='text-secondary' to='/auth/register'>Register</Link></p>
        </fieldset>
      </form>
    </div>
  </div>

    );
};

export default Login;