"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InputFields from "../../Components/InputFields";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const submitHandler = async () => {
    if (userName !== "" && password !== "") {
      try {
        const res = await signIn("credentials", {
          userName,
          password,
        });
        window.location.href = "/";
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      setShowError("Enter Valid Credentials");
    }
  };
  return (
    <div className="bg-cover bg-center h-screen login_page_backDrop flex items-center justify-center">
      <div className="flex flex-col bg-black text-white p-5 gap-2">
        <p className="text-3xl font-bold">Sign In</p>
        <InputFields
          label="Username"
          onChange={(e) => setUserName(e.target.value)}
          type={"string"}
          value={userName}
          autoFocus={true}
        />
        <InputFields
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          value={password}
        />
        <button
          onClick={submitHandler}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Sign In
        </button>
        {showError !== "" && <p className="text-red">{showError}</p>}
        <p>
          Dont have account? <Link href={"/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
