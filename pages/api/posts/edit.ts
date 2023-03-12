import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import authMiddleware from "../../../util/authMiddleware";
import connection from "../../../util/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = authMiddleware(req);
  if (!data) {
    res.status(403).json({ message: "Not Authenticated!" });
    return;
  }
  if (req.method === "PATCH") {
    const { description, image, id } = req.body;
    await connection;

    const post = await Post.findById(id);
    if (!post) {
      res.status(422).json({ message: "Post not found!" });
      return;
    }

    post.description = description;
    post.image = image;
    await post.save();

    res.status(200).json({ message: "Post edited successfully!" });
  }
};

export default handler;
