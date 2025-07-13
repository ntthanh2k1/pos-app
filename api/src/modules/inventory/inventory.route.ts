import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateInventoryDto from "./dto/create-inventory.dto";
import {
  createInventory,
  deleteInventory,
  getInventories,
  getInventory,
  updateInventory,
} from "./inventory.controller";
import GetInventoriesDto from "./dto/get-inventories.dto";
import UpdateInventoryDto from "./dto/update-inventory.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateInventoryDto), createInventory);
router.get("/", validateDto(GetInventoriesDto, "query"), getInventories);
router.get("/:id", getInventory);
router.patch("/:id", validateDto(UpdateInventoryDto), updateInventory);
router.delete("/:id", deleteInventory);

export default router;
