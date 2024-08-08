import React from "react";
import Star from "./Star";
import { addWatchListHandler } from "./ApiCallingFunctions";

const ShowDetails = ({
  data,
  fetch,
  presentInFavourites,
  item,
  setReRender,
  presentInWatchList,
}) => {
  return (
    <div className="lg:w-5/12 flex flex-col justify-start items-start h-full lg:py-8 gap-2">
      <div className="flex gap-3 items-end">
        <p className="text-3xl font-bold text-white shadow-lg">
          {data?.title || data?.original_name}
        </p>
        <p>{fetch === "movie" ? "Movie" : "TV-Show"}</p>
      </div>
      <div className="flex gap-1">
        {[...Array(10)].map((_, index) => (
          <Star filled={index + 1 <= data?.vote_average} key={index} />
        ))}
      </div>
      <p>{data?.overview}</p>
      <p>{data?.status}</p>
      <div className="flex gap-4">
        <button
          onClick={async (e) => {
            e.preventDefault();
            await addWatchListHandler(
              { ...item },
              true,
              false,
              !presentInWatchList
            );
            setReRender((prev) => !prev);
          }}
          className={`border border-white p-2 rounded hover:bg-red-500`}
        >
          {!presentInWatchList ? "Add to" : "Remove from"} Watchlist
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await addWatchListHandler(
              { ...item },
              false,
              true,
              !presentInFavourites
            );
            setReRender((prev) => !prev);
          }}
          className={`border border-white p-2 rounded hover:bg-red-500 `}
        >
          {!presentInFavourites ? "Add to" : "Remove from"} favourites
        </button>
      </div>
    </div>
  );
};

export default ShowDetails;
