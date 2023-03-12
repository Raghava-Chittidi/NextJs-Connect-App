import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "../../models/User";
import connection from "../../util/dbConnect";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    await connection;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(422).json({ message: "Invalid username or password!" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(422).json({ message: "Invalid username or password!" });
      return;
    }
    const jwtToken = jwt.sign(
      { name: user.name, userId: user._id.toString() },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Logged in successfully!",
      name: user.name,
      id: user._id.toString(),
      token: jwtToken,
      image: user.image,
    });
  }
};

export default handler;
