import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConfig from "./config/db.config";
import errorHandler from "./middleware/error.middleware";
import globalLimiter from "./middleware/rate-limit.middleware";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";

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

app.use(errorHandler);

const startServer = async () => {
  try {
    await dbConfig.initialize();
    console.log("Data Source has been initialized!");

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Data Source initialization error:", error);
    process.exit(1);
  }
};

startServer();
