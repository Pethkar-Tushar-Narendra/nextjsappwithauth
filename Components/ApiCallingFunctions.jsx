import axios from "axios";

export const addWatchListHandler = async (
  item,
  watchList,
  favourite,
  add,
  review,
  user,
  rating,
  movieId,
  fetch
) => {
  try {
    const response = await axios.post("/api/list", {
      watchlist: watchList,
      item: { ...item },
      favourite: favourite,
      add: add,
      review,
      user,
      rating,
      movieId,
      fetch,
    });
  } catch (error) {
    console.log(error, "error");
  }
};
