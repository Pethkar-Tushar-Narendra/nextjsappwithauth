import React from "react";
import { addWatchListHandler } from "./ApiCallingFunctions";
import { useSession } from "next-auth/react";

const ProductCard = ({ item, fetch, watchlist, favourites, reRender }) => {
  const presentInWatchList = watchlist?.find((ele) => ele.id === item.id);
  const presentInFavourites = favourites?.find((ele) => ele.id === item.id);
  const userName = useSession();

  return (
    <>
      {item?.poster_path ? (
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <img
            style={{
              width: "150px",
              height: "225px",
              cursor: "pointer",
            }}
            className="transform transition-transform duration-500 hover:scale-110"
            src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
          />
        </div>
      ) : (
        <div
          style={{
            width: "150px",
            height: "225px",
          }}
        >
          No Poster
        </div>
      )}
      <div className="flex gap-1 justify-start w-full flex-col items-between">
        <p className="max-w-full md:max-w-36 w-full	overflow-hidden text-ellipsis whitespace-nowrap">
          {fetch === "movie" ? item?.original_title : item?.original_name}
        </p>
        <div className="flex justify-between">
          <p>{fetch === "movie" ? item?.release_date : item?.first_air_date}</p>
          <p>{item?.vote_average?.toFixed(1)}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="relative group w-6 h-6 flex items-center justify-center "
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                item,
                true,
                false,
                !presentInWatchList,
                undefined,
                userName?.data?.user?.name
              );
              reRender((prev) => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="watchlist"
              width="24px"
              height="24px"
              className="w-auto h-6 absolute group-hover:hidden"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="watchlist"
              width="24px"
              height="24px"
              className={`w-auto h-6 group-hover:block ${
                presentInWatchList ? "block" : "hidden"
              }`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button
            className="relative group w-6 h-6 flex items-center justify-center"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                item,
                false,
                true,
                !presentInFavourites
              );
              reRender((prev) => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              id="favourite"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24px"
              height="24px"
              className="w-auto h-6 absolute group-hover:hidden"
            >
              <path d="M6 4a2 2 0 0 0-2 2v16l8-4 8 4V6a2 2 0 0 0-2-2H6z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              id="favourite"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24px"
              height="24px"
              className={`w-auto h-6 group-hover:block ${
                presentInFavourites ? "block" : "hidden"
              }`}
            >
              <path d="M6 4a2 2 0 0 0-2 2v16l8-4 8 4V6a2 2 0 0 0-2-2H6z" />
            </svg>
          </button>
        </div>
        {/* <div className="flex gap-2">
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(item, true, false, !presentInWatchList);
              reRender((prev: boolean) => !prev);
            }}
          >
            {!presentInWatchList ? "Add to" : "Remove from"} Watchlist
          </button>
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                item,
                false,
                true,
                !presentInFavourites
              );
              reRender((prev: boolean) => !prev);
            }}
          >
            {!presentInFavourites ? "Add to" : "Remove from"} Favourites
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ProductCard;
