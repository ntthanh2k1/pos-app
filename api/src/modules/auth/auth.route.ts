import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import RegisterDto from "./dtos/register.dto";
import {
  changePassword,
  getAuthUser,
  login,
  logout,
  refreshToken,
  register,
  selectBranch,
} from "./auth.controller";
import LoginDto from "./dtos/login.dto";
import authorize from "../../middleware/auth.middleware";
import ChangePasswordDto from "./dtos/change-password.dto";

const router = express.Router();

// router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);
router.post("/logout", authorize(false), logout);
router.post("/refresh-token", refreshToken);
router.post("/select-branch", authorize(false), selectBranch);
router.get("/get-auth-user", authorize(false), getAuthUser);
router.patch(
  "/change-password",
  authorize(false),
  validateDto(ChangePasswordDto),
  changePassword
);

export default router;
