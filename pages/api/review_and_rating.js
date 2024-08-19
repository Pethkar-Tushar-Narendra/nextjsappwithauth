import { getSession } from "next-auth/react";
import connectMongoDB from "../../libs/mongodb";
import { authOptions } from "./auth/[...nextauth]";
import RatingAndReviews from "../../models/rating";

export default async function handler(request, res) {
  if (request.method === "POST") {
    try {
      const { review, user, rating, movieId, fetch, userName } = request.body;
      const session = await getSession(authOptions);
      console.log(
        review,
        user,
        rating,
        movieId,
        fetch,
        userName,
        "review adding api"
      );

      await connectMongoDB();
      if (review && user) {
        const newReview = new RatingAndReviews({
          user,
          review,
          rating,
          userName: user,
          movieId,
          fetch,
        });
        const userReviews = await newReview.save();

        return res.json(userReviews, { status: 201 });
      }
    } catch (error) {
      return res.json({ error }, { status: 201 });
    }
  }
}
