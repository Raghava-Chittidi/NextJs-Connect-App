import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../util/authMiddleware";
import connection from "../../util/dbConnect";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

const handler = async (req: NextApiRequest, res: any) => {
  const data = authMiddleware(req);
  if (!data) {
    res.status(403).json({ message: "Not Authenticated!" });
    return;
  }

  if (req.method === "POST") {
    let { chatId, sender, receiver, message } = req.body;
    await connection;

    if (!chatId) {
      const chat = new Chat({ members: [sender, receiver] });
      await chat.save();
      chatId = chat._id;
    }

    const newMessage = new Message({
      chatId: chatId,
      sender,
      message,
    });
    await newMessage.save();

    const msg = { ...newMessage._doc, _id: newMessage._id.toString() };
    res.socket.server.io.emit("message", { message: msg });

    res.status(201).json({
      message: msg,
    });
  }
};

export default handler;
