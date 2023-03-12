import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../util/authMiddleware";
import connection from "../../../util/dbConnect";
import Message from "../../../models/Message";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = authMiddleware(req);
  if (!data) {
    res.status(403).json({ message: "Not Authenticated!" });
    return;
  }

  if (req.method === "GET") {
    const chatId = req.query.chatId;
    await connection;

    const messages = await Message.find({ chatId: chatId }).sort({
      createdAt: 1,
    });

    res.status(200).json({ messages });
  }
};

export default handler;
