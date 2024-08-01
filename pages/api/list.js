import { getServerSession } from "next-auth";
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
  // console.log(request.query, "request");
  if (request.method === "POST") {
  } else {
    const searchParams = request.query;
    let watchList = [];
    let favourites = [];
    let reviews;
    let userReviews = [];
    let userObject;
    let session;
    try {
      session = await getServerSession(authOptions);

      await connectMongoDB();

      userObject = await Users.findOne({
        userName: session?.user?.name,
      });
      watchList = [...userObject?.watchlist];
      favourites = [...userObject?.favourites];
    } catch (error) {
      console.log(userObject, watchList, favourites);
      return res.json({ error }, { status: 201 });
    }

    const fetch = searchParams.get("fetch");
    const page = searchParams.get("page") || "1";
    const getGenre = searchParams.get("getGenre");
    const getDetail = searchParams.get("getDetail");
    const watchListParam = searchParams.get("watchList");
    const favouritesParam = searchParams.get("favourites");
    const id = searchParams.get("id");
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
    if (!searchParams.keys().next().value || !fetch) {
      try {
        return res.json({ message: "invalid query" }, { status: 201 });
      } catch (e) {
        return res.json({ error: e }, { status: 201 });
      }
    } else {
      if (Array.from(searchParams.entries()).length === 2) {
        try {
          const response = await getAll(
            searchParams.get("fetch") || "movie",
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
      const category = searchParams.get("category");
      const search = searchParams.get("search");
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
              searchParams.get("query") || ""
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
              searchParams.get("genre_id") || "",
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
              searchParams.get("keywordId") || ""
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

async function POST(request) {
  try {
    const {
      item,
      watchlist,
      favourite,
      add,
      review,
      user,
      rating,
      movieId,
      fetch,
    } = await request.json();
    const session = await getServerSession(authOptions);
    await connectMongoDB();

    if (review && user) {
      const newReview = new RatingAndReviews({
        user,
        rating,
        review,
        userName: user.userName,
        movieId,
        fetch,
      });
      const userReviews = await newReview.save();

      return NextResponse.json(userReviews, { status: 201 });
    }
    const updatedDocument = await Users.findOneAndUpdate(
      {
        userName: session?.user?.name,
      },
      add
        ? {
            $push: watchlist
              ? { watchlist: { ...item } }
              : favourite
              ? {
                  favourites: { ...item },
                }
              : {},
          }
        : {
            $pull: watchlist
              ? { watchlist: { id: item.id } }
              : favourite
              ? {
                  favourites: { id: item.id },
                }
              : {},
          },
      {
        new: true,
      }
    );

    if (!updatedDocument) {
      throw new Error("Cannot find user.");
    }
    return NextResponse.json(updatedDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 201 });
  }
}
