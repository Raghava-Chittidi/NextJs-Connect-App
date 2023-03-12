import mongoose from "mongoose";

export interface IPost {
  description: string;
  image?: string;
  date: Date;
  user: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
}

const Schema = mongoose.Schema;
const postSchema = new Schema<IPost>({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
