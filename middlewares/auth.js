import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admin Only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
