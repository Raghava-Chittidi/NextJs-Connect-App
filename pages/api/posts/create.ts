import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import User from "../../../models/User";
import authMiddleware from "../../../util/authMiddleware";
import connection from "../../../util/dbConnect";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = authMiddleware(req);
  if (!data) {
    res.status(403).json({ message: "Not Authenticated!" });
    return;
  }
  if (req.method === "POST") {
    const { description, image } = req.body;
    await connection;

    const post = new Post({
      description,
      image: image ? image : "",
      user: new mongoose.Types.ObjectId(data.userId),
    });
    await post.save();
    const postId = post._id.toString();

    const user = await User.findById(data.userId);
    user.posts.push(postId);
    await user.save();

    res.status(201).json({ message: "Post created successfully!" });
  }
};

export default handler;
