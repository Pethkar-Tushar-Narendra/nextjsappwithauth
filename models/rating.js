import mongoose, { Schema } from "mongoose";

const ratingAndReviewsSchema = new Schema(
  {
    rating: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    userName: { type: String },
    fetch: { type: String },
    movieId: { type: String },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);
let RatingAndReviews;

if (mongoose.models.RatingAndReviews) {
  console.log("schema present");
  RatingAndReviews = mongoose.models.RatingAndReviews;
} else {
  console.log("schema not present");
  RatingAndReviews = mongoose.model("RatingAndReviews", ratingAndReviewsSchema);
}

// const RatingAndReviews =
//   mongoose.models.ratingAndReviewsSchema ||
//   mongoose.model("RatingAndReviews", ratingAndReviewsSchema);

export default RatingAndReviews;
