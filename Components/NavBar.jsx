"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Logout from "../pages/logout/Logout";
import useWindowSize from "./useWindowSize";

const NavBar = () => {
  const { width } = useWindowSize();
  const [toggleMenu, setToggleMenu] = useState(false);
  const session = useSession();

  const username = session?.data?.user?.name;
  return (
    <div className="w-full px-8 py-4 bg-transparent md:px-4 flex justify-between">
      <p className="text-4xl font-bold text-red-500" id="title_icon">
        <Link href={"/"}>{width >= 768 ? "Nextflix" : "N"}</Link>
      </p>
      <div className="flex gap-2 item-center">
        <p className="p-0 m-0 flex items-center">
          Welcome {username || "dev User"}
        </p>
        {width < 768 ? (
          <div className="relative">
            <button
              className="kabab-menu-button py-1  h-fit px-2 bg-gray-200 rounded-full"
              onClick={() => setToggleMenu((prev) => !prev)}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a1 1 0 011 1v1a1 1 0 01-1 1 1 1 0 01-1-1V9a1 1 0 011-1zm0-4a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zm0 8a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {toggleMenu && (
              <ul className="absolute p-2 flex flex-col gap-1 translate-100 translate-y-4 text-black navbar">
                <li className="bg-gray-200 px-2 py-1">
                  <Link href={"/watchlist"}>WatchList</Link>
                </li>
                <li className="bg-gray-200 px-2 py-1">
                  <Link href={"/favourites"}>Favourites</Link>
                </li>
                <li className="bg-gray-200 px-2 py-1">
                  <Logout className="" />
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex gap-2 px-2">
            <button className="hover:underline  h-fit">
              <Link href={"/watchlist"}>WatchList</Link>
            </button>
            <button className="hover:underline h-fit ">
              <Link href={"/favourites"}>Favourites</Link>
            </button>
            <Logout className="hover:underline" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
