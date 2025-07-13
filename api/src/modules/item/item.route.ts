import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateItemDto from "./dto/create-item.dto";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "./item.controller";
import GetItemsDto from "./dto/get-items.dto";
import UpdateItemDto from "./dto/update-item.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateItemDto), createItem);
router.get("/", validateDto(GetItemsDto, "query"), getItems);
router.get("/:id", getItem);
router.patch("/:id", validateDto(UpdateItemDto), updateItem);
router.delete("/:id", deleteItem);

export default router;
