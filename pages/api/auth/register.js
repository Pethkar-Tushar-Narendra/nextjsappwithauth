import { hashPassword } from "../../../Components/Functions";
import connectMongoDB from "../../../libs/mongodb";
import Users from "../../../models/users";

// Get list will provide list of movies by checking request data
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userName, password, email } = await req.body;
      await connectMongoDB();
      const encryptedPassword = await hashPassword(password);
      const user = new Users({
        userName,
        password: encryptedPassword,
        email,
        watchlist: [],
        favourites: [],
      });
      await user.save();
      return res.json({ message: "User Registered" }, { status: 201 });
    } catch (error) {
      console.log("error user creation", error);
      return res.json({ error }, { status: 201 });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
