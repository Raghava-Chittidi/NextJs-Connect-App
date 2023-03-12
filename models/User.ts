import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  friends: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
}

const Schema = mongoose.Schema;
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: "Post",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
