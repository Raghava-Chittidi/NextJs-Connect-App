import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

const authMiddleware = (req: NextApiRequest) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
      throw new Error("Not Authenticated!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken as jwt.JwtPayload;
  } catch (err) {
    return false;
  }
};

export default authMiddleware;
