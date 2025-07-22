import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateBusinessDto from "./dto/create-business.dto";
import {
  createBusiness,
  deleteBusiness,
  getBusiness,
  getBusinesses,
  updateBusiness,
} from "./business.controller";
import GetBusinessesDto from "./dto/get-businesses.dto";
import UpdateBusinessDto from "./dto/update-business.dto";

const router = express.Router();

router.use(authorize());

router.post("/", validateDto(CreateBusinessDto), createBusiness);
router.get("/", validateDto(GetBusinessesDto, "query"), getBusinesses);
router.get("/:id", getBusiness);
router.patch("/:id", validateDto(UpdateBusinessDto), updateBusiness);
router.delete("/:id", deleteBusiness);

export default router;
