import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import createCategoryItemDto from "./dto/create-category-item.dto";
import {
  createCategoryItem,
  getCategoryItems,
  getCategoryItem,
  updateCategoryItem,
  deleteCategoryItem,
} from "./category-item.controller";
import getCategoryItemsDto from "./dto/get-category-items.dto";
import updateCategoryItemDto from "./dto/update-category-item.dto";

const router = express.Router();

router.use(authorize());

router.post("/", validateDto(createCategoryItemDto), createCategoryItem);
router.get("/", validateDto(getCategoryItemsDto, "query"), getCategoryItems);
router.get("/:id", getCategoryItem);
router.patch("/:id", validateDto(updateCategoryItemDto), updateCategoryItem);
router.delete("/:id", deleteCategoryItem);

export default router;
