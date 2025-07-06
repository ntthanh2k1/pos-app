import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateUserDto from "./dtos/create-user.dto";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controller";
import UpdateUserDto from "./dtos/update-user.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateUserDto), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", validateDto(UpdateUserDto), updateUser);
router.delete("/:id", deleteUser);

export default router;
