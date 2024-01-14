import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const userData = {
  email: "",
  password: "",
};

const Signup = () => {
  const [user, setUser] = useState(userData);


  const { signup, error, isLoading } = useSignup;

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, [name]: value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     await signup(user);

  }

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h1>Sign up</h1>

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

        <button type="submit" disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Signup;
