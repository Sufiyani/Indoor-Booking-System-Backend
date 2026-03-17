import express from "express"
import helmet from "helmet"
import cors from 'cors'
import { errorMiddleware } from "./middlewares/error.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config({ path: './.env' });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

connectDB(mongoURI);

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use("/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🏏 Indoor Booking System API Running 🚀" });
});

app.use(errorMiddleware);

app.listen(port, () => 
  console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.')
);

export default app;