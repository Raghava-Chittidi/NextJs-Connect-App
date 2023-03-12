import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connection from "../../../util/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.userId;
    await connection;

    const user = await User.findById(id).populate("friends", "-password");

    if (!user) {
      res.status(422).json({ message: "User could not be found!" });
      return;
    }

    res.status(200).json({
      friends: user.friends,
    });
  }
};

export default handler;
