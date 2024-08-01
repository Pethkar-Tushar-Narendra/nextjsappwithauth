"use client";
import InputFields from "../../Components/InputFields";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  const submitHandler = async () => {
    if (userName !== "" && password !== "" && email !== "") {
      setShowError("");
      try {
        const res = await axios.post("/api/auth/register/", {
          userName,
          password,
          email,
        });

        if (res) {
          const response = await signIn("credentials", {
            userName,
            password,
          });
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error, "error while sign up");
      }
    } else {
      setShowError("Enter Valid Credentials");
    }
  };
  return (
    <div className="bg-cover bg-center h-screen login_page_backDrop flex items-center justify-center">
      <div className="flex flex-col bg-black text-white p-5 gap-2">
        <p className="text-3xl font-bold">Sign Up</p>
        <InputFields
          label="Username"
          autoFocus={true}
          onChange={(e) => setUserName(e.target.value)}
          type={"string"}
          value={userName}
        />
        <InputFields
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          value={password}
        />
        <InputFields
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          value={email}
        />
        <button
          onClick={submitHandler}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Register
        </button>
        {showError !== "" && <p className="text-red">{showError}</p>}
        <p>
          Already have an account? <Link href={"/login"}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
