import Image from "next/image";
import { Inter } from "next/font/google";
import Component from "@/Component/Login-btn";
import AccessToken from "@/Component/Accesstoken";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Component />
      <AccessToken />
    </>
  );
}
