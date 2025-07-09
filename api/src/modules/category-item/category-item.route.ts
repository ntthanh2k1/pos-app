import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import createCategoryItemDto from "./dto/create-category-item.dto";
import {
  createCategoryItem,
  getAllCategoryItems,
  getCategoryItemById,
  softDeleteCategoryItem,
  updateCategoryItem,
} from "./category-item.controller";
import getAllCategoryItemsDto from "./dto/get-all-category-items.dto";
import updateCategoryItemDto from "./dto/update-category-item.dto";
import authorize from "../../middleware/auth.middleware";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(createCategoryItemDto), createCategoryItem);
router.get(
  "/",
  validateDto(getAllCategoryItemsDto, "query"),
  getAllCategoryItems
);
router.get("/:id", getCategoryItemById);
router.patch("/:id", validateDto(updateCategoryItemDto), updateCategoryItem);
router.patch("/soft-delete/:id", softDeleteCategoryItem);

export default router;
