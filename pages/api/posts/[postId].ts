import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../models/Comment";
import Post from "../../../models/Post";
import User from "../../../models/User";
import authMiddleware from "../../../util/authMiddleware";
import connection from "../../../util/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = authMiddleware(req);
  if (!data) {
    res.status(403).json({ message: "Not Authenticated!" });
    return;
  }
  if (req.method === "DELETE") {
    await connection;
    const postId = req.query.postId;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(422).json({ message: "Post not found!" });
      return;
    }

    await Post.findByIdAndRemove(postId);

    const user = await User.findById(data.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ message: "Post deleted successfully!" });
  }
  if (req.method === "POST") {
    const postId = req.query.postId;
    const { comment, userId } = req.body;
    await connection;

    const newComment = new Comment({
      comment: comment,
      user: new mongoose.Types.ObjectId(userId),
    });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: "Commented successfully!" });
  }
};

export default handler;
