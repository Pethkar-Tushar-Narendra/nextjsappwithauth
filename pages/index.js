import { Inter } from "next/font/google";
import Login from "./login/Login";
import Home from "./Home";

const inter = Inter({ subsets: ["latin"] });

export default function BaseComponent() {
  return (
    <>
      <Login />
      {/* <Home /> */}
    </>
  );
}
