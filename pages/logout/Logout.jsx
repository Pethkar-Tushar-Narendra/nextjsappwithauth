"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = ({ className }) => {
  const logoutHandler = async () => {
    try {
      await signOut();
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <button onClick={logoutHandler} className={className}>
      Logout
    </button>
  );
};

export default Logout;
