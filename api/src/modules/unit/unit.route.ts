import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateUnitDto from "./dtos/create-unit.dto";
import { createUnit, getAllUnits } from "./unit.controller";
import authorize from "../../middleware/auth.middleware";
import GetAllUnitsDto from "./dtos/get-all-units.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateUnitDto), createUnit);
router.get("/", validateDto(GetAllUnitsDto, "query"), getAllUnits);

export default router;
