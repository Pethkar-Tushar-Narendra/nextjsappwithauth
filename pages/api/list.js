import { getSession } from "next-auth/react";
import {
  getAll,
  getByGenreId,
  getByTitle,
  getDetails,
  getGenres,
  getMovieReviews,
  getMoviesByKeywordId,
  getRecommendedMovies,
  getSimilarMovies,
  getTopRated,
  getTrending,
  getUpcomingMovies,
  getVideos,
} from "../../Components/Functions";
import connectMongoDB from "../../libs/mongodb";
import RatingAndReviews from "../../models/rating";
import Users from "../../models/users";
import { authOptions } from "./auth/[...nextauth].js";

export default async function handler(request, res) {
  if (request.method === "POST") {
    try {
      const { item, watchlist, favourite, add, user, fetch } = request.body;

      const session = await getSession(authOptions);

      await connectMongoDB();

      const updatedDocument = await Users.findOneAndUpdate(
        {
          userName: user,
        },
        add
          ? {
              $push: watchlist
                ? { watchlist: { item: { ...item }, fetch } }
                : favourite
                ? {
                    favourites: { item: { ...item }, fetch },
                  }
                : {},
            }
          : {
              $pull: watchlist
                ? { watchlist: { item: { id: { $eq: item.id } } } }
                : favourite
                ? { favourites: { item: { id: { $eq: item.id } } } }
                : {},
            },
        add
          ? {
              new: true,
            }
          : {
              multi: true,
            }
      );

      if (!updatedDocument) {
        throw new Error("Cannot find user.");
      }
      return res.json(updatedDocument, { status: 201 });
    } catch (error) {
      return res.json({ error }, { status: 201 });
    }
  } else {
    const searchParams = await request.query;
    let watchList = [];
    let favourites = [];
    let reviews;
    let userReviews = [];
    let userObject;
    try {
      await connectMongoDB();

      userObject = await Users.findOne({
        userName: searchParams["name"],
      });
      watchList = [...userObject?.watchlist];
      favourites = [...userObject?.favourites];
    } catch (error) {
      console.log(userObject, watchList, favourites);
      return res.json({ error }, { status: 201 });
    }

    const fetch = searchParams["fetch"];
    const page = searchParams["page"] || "1";
    const getGenre = searchParams["getGenre"] || "";
    const getDetail = searchParams["getDetail"] || "";
    const watchListParam = searchParams["watchList"] || "";
    const favouritesParam = searchParams["favourites"] || "";
    const id = searchParams["id"] || "";

    try {
      userReviews = await RatingAndReviews.find({ fetch: fetch, movieId: id });
    } catch (error) {
      return res.json({ message: "invalid user" }, { status: 201 });
    }
    if (watchListParam) {
      try {
        return res.json({ watchList, userObject }, { status: 201 });
      } catch (error) {
        return res.json({ error }, { status: 201 });
      }
    }
    if (favouritesParam) {
      try {
        return res.json({ favourites, userObject }, { status: 201 });
      } catch (error) {
        return res.json({ error }, { status: 201 });
      }
    }

    if (Object.keys(searchParams).length === 0 || !fetch) {
      try {
        return res.json({ message: "invalid query" }, { status: 201 });
      } catch (e) {
        return res.json({ error: e }, { status: 201 });
      }
    } else {
      console.log("running something", Object.keys(searchParams).length);
      if (Object.keys(searchParams).length === 3) {
        try {
          const response = await getAll(searchParams["fetch"] || "movie", page);
          return res.json(
            { ...response?.data, watchList, favourites, userObject },
            { status: 201 }
          );
        } catch (e) {
          return res.json({ error: e }, { status: 201 });
        }
      }
      const category = searchParams["category"];
      const search = searchParams["search"];
      if (category) {
        if (category === "trending") {
          try {
            const response = await getTrending(fetch, page);
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
        if (category === "top-rated") {
          try {
            const response = await getTopRated(fetch, page);
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
        if (category === "upcoming") {
          try {
            const response = await getUpcomingMovies(page);
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
      } else if (search) {
        if (search === "title") {
          try {
            const response = await getByTitle(
              fetch || "movie",
              searchParams["query"] || ""
            );
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
        if (search === "genres") {
          try {
            const response = await getByGenreId(
              searchParams["genre_id"] || "",
              fetch,
              page
            );
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
        if (search === "keywords") {
          try {
            const response = await getMoviesByKeywordId(
              searchParams["keywordId"] || ""
            );
            return res.json(
              { ...response?.data, watchList, favourites, userObject },
              { status: 201 }
            );
          } catch (e) {
            return res.json({ error: e }, { status: 201 });
          }
        }
      } else if (getGenre && fetch && page) {
        try {
          const response = await getGenres(fetch, page);
          return res.json(
            { ...response?.data, watchList, favourites, userObject },
            { status: 201 }
          );
        } catch (e) {
          return res.json({ error: e }, { status: 201 });
        }
      } else if (getDetail && fetch && id) {
        try {
          const response = await getDetails(fetch, id);
          const videoResponse = await getVideos(fetch, id);
          const similarMovies = await getSimilarMovies(fetch, id);
          const recommendedMovies = await getRecommendedMovies(fetch, id);
          reviews = (await getMovieReviews(fetch, id)) || [];
          return res.json(
            {
              ...response?.data,
              videos: [...videoResponse?.data?.results],
              similarMovies: [...similarMovies?.data?.results],
              recommendedMovies: [...recommendedMovies?.data?.results],
              reviews: [...reviews?.data?.results],
              watchList,
              favourites,
              userReviews,
            },
            { status: 201 }
          );
        } catch (e) {
          return res.json({ error: e }, { status: 201 });
        }
      }
    }
    return res.json({ message: "invalid request" }, { status: 201 });
  }
}
