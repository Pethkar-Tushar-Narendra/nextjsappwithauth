import { Inter } from "next/font/google";
import Home from "./Home";

const inter = Inter({ subsets: ["latin"] });

export default function BaseComponent() {
  return (
    <>
      <Home />
    </>
  );
}
