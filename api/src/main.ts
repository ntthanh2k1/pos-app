import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import globalLimiter from "./middleware/rate-limit.middleware";
import { connectDB } from "./config/database/db.config";
import apiRouter from "./modules/main.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(globalLimiter);

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, async () => {
  await connectDB();
  console.log(`http://localhost:${port}`);
});
