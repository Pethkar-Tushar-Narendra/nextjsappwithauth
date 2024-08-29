"use client";
import NavBar from "../../Components/NavBar";
import ProductCard from "../../Components/ProductCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../Components/useWindowSize";

const WatchList = () => {
  const [data, setData] = useState([{ id: 0 }]);
  const [reRender, setReRender] = useState(true);
  const session = useSession();
  const { width } = useWindowSize();
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.get("/api/list", {
          params: {
            watchList: true,
            name: session?.data?.user?.name || "dev user",
          },
        });
        setData([...response?.data?.watchList]);
      } catch (error) {}
    };
    if (session?.data?.user) {
      postData();
    }
  }, [reRender, session]);

  const unqueArray = [...data?.filter((ele) => ele?.item?.id > 0)];

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className=" p-4 w-full text-white flex flex-wrap justify-center items-center gap-2 mt-2">
        <p className="w-full">WatchList</p>
        {unqueArray?.map((element, i) => {
          const item = element?.item;
          return (
            <Link
              href={`/${element.fetch}/${item.id}`}
              className={`bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col ${
                width < 600 ? "w-full" : "w-fit"
              } justify-center items-center text-white overflow-hidden`}
            >
              <ProductCard
                fetch={element.fetch}
                item={item}
                reRender={setReRender}
                key={i}
                watchlist={[...unqueArray] || []}
                favourites={data?.favourites || []}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WatchList;
