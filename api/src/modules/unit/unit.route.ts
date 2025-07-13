import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateUnitDto from "./dto/create-unit.dto";
import {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  deleteUnit,
} from "./unit.controller";
import GetUnitsDto from "./dto/get-units.dto";
import UpdateUnitDto from "./dto/update-unit.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateUnitDto), createUnit);
router.get("/", validateDto(GetUnitsDto, "query"), getUnits);
router.get("/:id", getUnit);
router.patch("/:id", validateDto(UpdateUnitDto), updateUnit);
router.delete("/:id", deleteUnit);

export default router;
