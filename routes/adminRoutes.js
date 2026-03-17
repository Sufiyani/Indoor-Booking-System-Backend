import express from "express";
import { adminLogin, getAdminProfile } from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Login
router.post("/login", adminLogin);

// Profile
router.get("/profile", verifyToken, isAdmin, getAdminProfile);

// Verify token (added)
router.get("/verify", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Token is valid", admin: req.admin });
});

export default router;
