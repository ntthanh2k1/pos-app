import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import globalLimiter from "./middleware/rate-limit.middleware";
import { connectDB } from "./config/database/db.config";
import authRoutes from "./modules/auth/auth.route";

import userRoutes from "./modules/user/user.route";

import branchRoutes from "./modules/branch/branch.route";
import inventoryRoutes from "./modules/inventory/inventory.route";

import unitRoutes from "./modules/unit/unit.route";
import categoryItemRoutes from "./modules/category-item/category-item.route";
import itemRoutes from "./modules/item/item.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(globalLimiter);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/branches", branchRoutes);
app.use("/api/inventories", inventoryRoutes);

app.use("/api/units", unitRoutes);
app.use("/api/category-items", categoryItemRoutes);
app.use("/api/items", itemRoutes);

app.use(errorHandler);

app.listen(port, async () => {
  await connectDB();
  console.log(`http://localhost:${port}`);
});
