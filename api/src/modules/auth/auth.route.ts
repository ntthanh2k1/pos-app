import express from "express";
import { getAuthUser, login, logout, register } from "./auth.controller";
import RegisterDto from "./dtos/register.dto";
import validateDto from "../../middleware/validate-dto.middleware";
import LoginDto from "./dtos/login.dto";
import authorize from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);
router.post("/logout", authorize, logout);
router.get("/get-auth-user", authorize, getAuthUser);

export default router;
