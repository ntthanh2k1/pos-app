import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateBranchDto from "./dto/create-branch.dto";
import {
  createBranch,
  deleteBranch,
  getBranch,
  getBranches,
  updateBranch,
} from "./branch.controller";
import GetBranchesDto from "./dto/get-branches.dto";
import UpdateBranchDto from "./dto/update-branch.dto";

const router = express.Router();

router.use(authorize());

router.post("/", validateDto(CreateBranchDto), createBranch);
router.get("/", validateDto(GetBranchesDto, "query"), getBranches);
router.get("/:id", getBranch);
router.patch("/:id", validateDto(UpdateBranchDto), updateBranch);
router.delete("/:id", deleteBranch);

export default router;
