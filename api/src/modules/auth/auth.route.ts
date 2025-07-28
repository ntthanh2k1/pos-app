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
} from "./auth.controller";
import LoginDto from "./dtos/login.dto";
import authorize from "../../middleware/auth.middleware";
import ChangePasswordDto from "./dtos/change-password.dto";

const router = express.Router();

router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authorize(), logout);
router.get("/get-auth-user", authorize(), getAuthUser);
router.patch(
  "/change-password",
  authorize(),
  validateDto(ChangePasswordDto),
  changePassword
);
router.post("/select-branch", authorize(false), changePassword);

export default router;
