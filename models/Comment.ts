import mongoose from "mongoose";
import { IUser } from "./User";

export interface IComment {
  _id: mongoose.Types.ObjectId;
  comment: string;
  user: IUser;
}

const Schema = mongoose.Schema;
const commentSchema = new Schema<IComment>({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
