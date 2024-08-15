"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddReview from "./AddReview";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard";
import ReviewCard from "./ReviewCard";
import ShowDetails from "./ShowDetails";
import useWindowSize from "./useWindowSize";
import { useSession } from "next-auth/react";

const Details = ({ id, fetch }) => {
  const [data, setData] = useState({
    videos: [],
    favourites: [{ id: 0 }],
    watchList: [{ id: 0 }],
  });
  const { width } = useWindowSize();
  const [reRender, setReRender] = useState(true);

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/list", {
          params: {
            fetch,
            getDetail: true,
            id,
            name: session?.data?.user?.name || "dev user",
          },
        });
        setData(response?.data || {});
      } catch (error) {
        console.log(error, "error");
      }
    };
    if (session?.data?.user) {
      fetchData();
    }
  }, [reRender, session, id]);

  const video =
    data?.videos?.length === 1
      ? data?.videos[0]
      : data?.videos?.find((ele) => ele.type === "Trailer")
      ? data?.videos?.find((ele) => ele.type === "Trailer")
      : data?.videos?.find((ele) => ele.type === "Teaser");
  const similarMovies = data?.similarMovies || [];
  const recommendedMovies = data?.recommendedMovies || [];
  const movieReviews = data?.reviews || [];
  let userReviews = data?.userReviews || [];

  const { watchList, favourites, ...item } = data;
  const presentInWatchList = watchList?.find((ele) => ele.id === item?.id);
  const presentInFavourites = favourites?.find((ele) => ele.id === item?.id);
  const screenWidth = width > 1024;

  return (
    <div className=" w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className="flex flex-col lg:flex-row lg:justify-between justify-start items-start lg:items-center px-4 py-2 gap-2">
        {screenWidth && (
          <ShowDetails
            data={data}
            fetch={fetch}
            presentInFavourites={presentInFavourites}
            item={item}
            setReRender={setReRender}
            presentInWatchList={presentInWatchList}
          />
        )}
        <Link
          href={
            fetch === "movie"
              ? `/movieTrailer/${video?.key}?movieDetails=/${fetch}/${id}`
              : `/tvTrailer/${video?.key}?movieDetails=/${fetch}/${id}`
          }
          className={`mb-2 lg:mb-0 w-full lg:w-7/12 h-fit bg-contain bg-no-repeat bg-center bg-start flex items-center justify-center ${
            video?.key && "cursor-pointer"
          } relative lg:overflow-hidden`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path})`}
            alt=""
            className="transform transition-transform duration-500 hover:scale-110"
          />
          {data?.backdrop_path && video?.key && (
            <svg
              fill="#ffffff"
              className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
            >
              <g>
                <path
                  d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
                />
                <path
                  d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
                />
              </g>
            </svg>
          )}
        </Link>
        {!screenWidth && (
          <ShowDetails
            data={data}
            fetch={fetch}
            presentInFavourites={presentInFavourites}
            item={item}
            setReRender={setReRender}
            presentInWatchList={presentInWatchList}
          />
        )}
      </div>

      <div className="w-full p-4 text-white flex flex-wrap justify-center items-center gap-2 mt-1">
        <p className="w-full">Recommended movies:</p>
        {recommendedMovies?.map((item, i) => (
          <Link
            key={i}
            href={`/${fetch}/${item.id}`}
            className={`bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col w-full md:w-fit justify-center items-center text-white overflow-hidden`}
          >
            <ProductCard
              fetch={fetch}
              item={item}
              reRender={setReRender}
              key={i}
              watchlist={data?.watchList || []}
              favourites={data?.favourites || []}
            />
          </Link>
        ))}
      </div>
      <div className="w-full  p-4 text-white flex flex-wrap justify-center items-center gap-2 mt-2">
        <p className="w-full">Similar movies:</p>
        {similarMovies?.map((item, i) => (
          <Link
            key={i}
            href={`/${fetch}/${item.id}`}
            className="bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col w-full md:w-fit justify-center items-center text-white overflow-hidden"
          >
            <ProductCard
              fetch={fetch}
              item={item}
              reRender={setReRender}
              key={i}
              watchlist={data?.watchList || []}
              favourites={data?.favourites || []}
            />
          </Link>
        ))}
      </div>
      <AddReview id={id} fetch={fetch} />
      {(movieReviews || userReviews) &&
        movieReviews?.length + userReviews?.length > 0 && (
          <div className="p-4 flex flex-col border-t-2 border-red-900">
            <p className="w-full text-3xl">
              {movieReviews?.length + userReviews?.length} Member Reviews for{" "}
              {data?.title || data?.original_name}
            </p>
            {movieReviews?.map((review, i) => (
              <ReviewCard
                key={i}
                author={review.author}
                content={review.content}
                rating={review.author_details.rating}
              />
            ))}
            {userReviews?.map((review, i) => (
              <ReviewCard
                key={i}
                author={review.userName}
                content={review.review}
                rating={review.rating}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default Details;
