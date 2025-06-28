import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import typeOrmConfig from "./config/typeorm.config";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(helmet());
app.use(
  cors({
    // origin: "http://localhost:xxxx",
    // credentials: true
  })
);
app.use(cookieParser());

const startServer = async () => {
  try {
    await typeOrmConfig.initialize();
    console.log("Data Source has been initialized!");

    app.listen(port, async () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Data Source initialization error:", error);
    process.exit(1);
  }
};

startServer();
