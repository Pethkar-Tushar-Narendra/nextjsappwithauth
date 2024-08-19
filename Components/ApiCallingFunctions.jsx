import axios from "axios";

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
