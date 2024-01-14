import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const userData = {
  email: "",
  password: "",
};

const Login = () => {

  const [user, setUser] = useState(userData);
  const { login , error , isLoading } = useLogin();

  const onValueChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log({ ...user, [name]: value });
    setUser({
      ...user , [name] : value
    })
    
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(user);
  }

  return (
    <>
       <form className="login" onSubmit={handleSubmit}>
        <h1>Log in</h1>

        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => onValueChange(e)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => onValueChange(e)}
        />

        <button type="submit" disabled={isLoading}>Login</button> 
        {error && <div className='error'>{error}</div>}
      </form>
    </>
  )
}

export default Login
