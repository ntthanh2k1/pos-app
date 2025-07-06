import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateUnitDto from "./dtos/create-unit.dto";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  softDeleteUnit,
  updateUnit,
} from "./unit.controller";
import authorize from "../../middleware/auth.middleware";
import GetAllUnitsDto from "./dtos/get-all-units.dto";
import UpdateUnitDto from "./dtos/update-unit.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateUnitDto), createUnit);
router.get("/", validateDto(GetAllUnitsDto, "query"), getAllUnits);
router.get("/:id", getUnitById);
router.patch("/:id", validateDto(UpdateUnitDto), updateUnit);
router.patch("/soft-delete/:id", softDeleteUnit);

export default router;
