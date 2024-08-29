import { useState } from "react";
import { addReview } from "./ApiCallingFunctions";

const AddReview = ({ id, fetch, setReRender }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let user;

    try {
      if (localStorage?.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user") || "");
      } else {
        throw new Error("user not available.");
      }
      await addReview(review, user, rating, id, fetch, user?.userName);
      setRating("");
      setReview("");
      setReRender((prev) => !prev);
    } catch (error) {
      console.log("error detected", error);
    }
  };

  return (
    <div className="w-full p-4">
      <p>Add Review</p>
      <form className="flex w-full flex-col gap-1" onSubmit={onSubmit}>
        <label>Add comment :</label>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e?.target?.value || "")}
          required
          className="text-black"
        />
        <p>Add Rating :</p>
        <input
          type="number"
          max={10}
          min={0}
          value={rating}
          className="text-black"
          onChange={(e) => setRating(e?.target?.value || "")}
          required
        />
        <input type="submit" value={"Add"} style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
};

export default AddReview;
