import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateBusinessDto from "./dto/create-business.dto";
import {
  createBusiness,
  deleteBusiness,
  getBusiness,
  updateBusiness,
} from "./business.controller";
import UpdateBusinessDto from "./dto/update-business.dto";

const router = express.Router();

router.post("/", validateDto(CreateBusinessDto), createBusiness);
router.get("/:id", authorize(), getBusiness);
router.patch(
  "/:id",
  authorize(),
  validateDto(UpdateBusinessDto),
  updateBusiness
);
router.delete("/:id", authorize(), deleteBusiness);

export default router;
