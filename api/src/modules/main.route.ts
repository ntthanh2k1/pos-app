import express from "express";
import authRoutes from "./auth/auth.route";

import userRoutes from "./user/user.route";

import businessRoutes from "./business/business.route";
import branchRoutes from "./branch/branch.route";
import inventoryRoutes from "./inventory/inventory.route";
import supplierRoutes from "./supplier/supplier.route";

import unitRoutes from "./unit/unit.route";
import categoryItemRoutes from "./category-item/category-item.route";
import itemRoutes from "./item/item.route";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/businesses", businessRoutes);
router.use("/branches", branchRoutes);
router.use("/inventories", inventoryRoutes);
router.use("/suppliers", supplierRoutes);

router.use("/units", unitRoutes);
router.use("/category-items", categoryItemRoutes);
router.use("/items", itemRoutes);

export default router;
