import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connection from "../../../util/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, friendName } = req.body;
    await connection;

    const friend = await User.findOne({ name: friendName });
    const currentUser = await User.findById(id);

    if (!friend || !currentUser) {
      res.status(422).json({ message: "User could not be found!" });
      return;
    }

    friend.friends.pull(id);
    await friend.save();
    currentUser.friends.pull(friend._id);
    await currentUser.save();

    res.status(200).json({
      message: "Removed as friend!",
    });
  }
};

export default handler;
