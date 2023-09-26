import React, { useState } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  const [isUserId, setIsUserId] = useState(
    localStorage.getItem("authUserId") !== null
  );

  function signOut() {
    localStorage.clear();
    setIsUserId(false);
  }


  return (
    <div className="main-page-wrapper">
      <Outlet />
      <header className="navbar">
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5}}
          href="/"
          className="nav-logo"
        >
          VisionVault
        </motion.a>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5}}
        >
          {isUserId ? (
            <div className="nav-menu">
              <Link to="/" className="nav-btn" onClick={signOut}>
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="nav-menu">
              <Link to="/login" className="nav-btn">
                Login
              </Link>
              <Link to="/signup" className="nav-btn">
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      </header>
      <div className="main-page-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="main-page-image"
        ></motion.div>
      </div>
      <div className="main-page-content">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Capture Moments
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          Deliver Memories
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1.5, delay: 2.5 }}
        className="text-button">
        <p>Share beautiful photo galleries with your clients.</p>

        {isUserId ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/SignUp">Get Started</Link>
        )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
