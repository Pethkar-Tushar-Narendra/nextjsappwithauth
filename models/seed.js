// seed.js
// const mongoose = require("mongoose");
// const connectDB = require("./db");
// const RatingAndReviews = require("./models/RatingAndReviews");

import RatingAndReviews from "./rating";
import connectMongoDB from "../libs/mongodb";

// Connect to MongoDB
connectMongoDB();

export const seedData = async () => {
  try {
    // Clear existing data
    await RatingAndReviews.deleteMany({});

    // Create a new rating and review
    const review = new RatingAndReviews({
      user: "66a25334fa9acbf8d3aec3c2",
      rating: 5,
      userName: "System",
      fetch: "movie",
      movieId: "533535",
      review: "This is an excellent product!",
    });

    await review.save();

    console.log("Seeding successful");
    // process.exit();
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
};
