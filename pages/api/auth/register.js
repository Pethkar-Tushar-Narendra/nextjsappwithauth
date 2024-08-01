import { NextResponse } from "next/server";
import { hashPassword } from "../../../Components/Functions";
import connectMongoDB from "../../../libs/mongodb";
import Users from "../../../models/users";

// Get list will provide list of movies by checking request data
export async function POST(request) {
  try {
    const { userName, password, email } = await request.json();
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
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.log("error user creation", error);

    return NextResponse.json({ error }, { status: 201 });
  }
}
