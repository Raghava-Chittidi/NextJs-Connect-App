import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "../../models/User";
import connection from "../../util/dbConnect";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password, image } = req.body;
    await connection;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User with email already exists!" });
      return;
    }
    if (password.length < 5) {
      res
        .status(422)
        .json({ message: "Password is too short! (Min 5 characters)" });
      return;
    }
    if (!image) {
      res.status(422).json({ message: "Please set an image url!" });
      return;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPw,
      image,
    });
    await user.save();
    const jwtToken = jwt.sign(
      { name: user.name, userId: user._id.toString() },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "User created successfully!",
      name,
      id: user._id.toString(),
      token: jwtToken,
      image,
    });
  }
};

export default handler;
