import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuthContextHook from "./hooks/useAuthContextHook";


// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {

  const { user } = useAuthContextHook();

  return (
    <>
      <div className="App">
        
        <Router>

        <Navbar/>
          
          <div className="pages">
            
            <Routes>
              
              <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
              
            </Routes>

          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
