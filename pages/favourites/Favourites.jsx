"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import ProductCard from "../../Components/ProductCard";
import useWindowSize from "../../Components/useWindowSize";

const Favourites = () => {
  const [data, setData] = useState([{ id: 0 }]);
  const [reRender, setReRender] = useState(true);
  const { width } = useWindowSize();
  const session = useSession();
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.get("/api/list", {
          params: {
            favourites: true,
            name: session?.data?.user?.name || "dev user",
          },
        });
        setData([...response?.data?.favourites]);
      } catch (error) {}
    };
    if (session?.data?.user) {
      postData();
    }
  }, [reRender, session]);

  const unqueArray = [
    ...new Map(
      data?.filter((item) => item.id).map((item) => [item.id, item])
    )?.values(),
  ];

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className="p-4 w-full text-white flex flex-wrap justify-center items-center gap-2 mt-2">
        <p className="w-full">Favourites</p>
        {unqueArray?.map((item, i) => (
          <Link
            href={`/${fetch}/${item.id}`}
            className={`bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col ${
              width < 600 ? "w-full" : "w-fit"
            } justify-center items-center text-white overflow-hidden`}
          >
            <ProductCard
              fetch={"movie"}
              item={item}
              reRender={setReRender}
              key={i}
              watchlist={data?.watchList || []}
              favourites={[...unqueArray] || []}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
