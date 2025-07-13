import express from "express";
import authRoutes from "./auth/auth.route";

import userRoutes from "./user/user.route";

import branchRoutes from "./branch/branch.route";
import inventoryRoutes from "./inventory/inventory.route";

import unitRoutes from "./unit/unit.route";
import categoryItemRoutes from "./category-item/category-item.route";
import itemRoutes from "./item/item.route";

const router = express.Router();

router.use("/api/auth", authRoutes);

router.use("/api/users", userRoutes);

router.use("/api/branches", branchRoutes);
router.use("/api/inventories", inventoryRoutes);

router.use("/api/units", unitRoutes);
router.use("/api/category-items", categoryItemRoutes);
router.use("/api/items", itemRoutes);

export default router;
