import axios from "axios";

export const addReview = async (
  review,
  user,
  rating,
  movieId,
  fetch,
  userName
) => {
  try {
    try {
      const response = await axios.post("/api/review_and_rating", {
        review,
        user,
        rating,
        movieId,
        fetch,
        userName,
      });
    } catch (error) {
      console.log(error, "error");
    }
  } catch (error) {}
};

export const addWatchListHandler = async (
  item,
  watchList,
  favourite,
  add,
  user
) => {
  try {
    const response = await axios.post("/api/list", {
      watchlist: watchList,
      item: { ...item },
      favourite: favourite,
      add: add,
      user,
    });
  } catch (error) {
    console.log(error, "error");
  }
};
