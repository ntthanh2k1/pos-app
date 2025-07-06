import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import globalLimiter from "./middleware/rate-limit.middleware";
import { connectDB } from "./config/db.config";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import unitRoutes from "./modules/unit/unit.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(globalLimiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/units", unitRoutes);

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  await connectDB();
});
