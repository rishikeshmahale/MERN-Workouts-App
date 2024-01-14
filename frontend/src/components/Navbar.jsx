import React from "react";
import useLogout from "../hooks/useLogout";
import useContextHook from "../hooks/useContextHook";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useContextHook();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>

          <nav>
            {user ? (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
