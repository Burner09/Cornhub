import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    const verified = jwt.verify(token, process.env.SECRETMESSAGE);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};