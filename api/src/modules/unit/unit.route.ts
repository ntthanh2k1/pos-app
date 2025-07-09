import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateUnitDto from "./dto/create-unit.dto";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  softDeleteUnit,
  updateUnit,
} from "./unit.controller";
import GetAllUnitsDto from "./dto/get-all-units.dto";
import UpdateUnitDto from "./dto/update-unit.dto";
import authorize from "../../middleware/auth.middleware";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateUnitDto), createUnit);
router.get("/", validateDto(GetAllUnitsDto, "query"), getAllUnits);
router.get("/:id", getUnitById);
router.patch("/:id", validateDto(UpdateUnitDto), updateUnit);
router.patch("/soft-delete/:id", softDeleteUnit);

export default router;
