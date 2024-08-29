import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchlist: { type: [{ item: { type: {} }, fetch: { type: String } }] },
    favourites: { type: [{ item: { type: {} }, fetch: { type: String } }] },
  },
  {
    timestamps: true,
  }
);

// const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

let Users;

if (mongoose.models.Users) {
  Users = mongoose.models.Users;
} else {
  Users = mongoose.model("Users", usersSchema);
}
export default Users;
