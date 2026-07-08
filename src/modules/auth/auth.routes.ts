import { Router } from "express";
import { auhtController } from "./auth.controller";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

// user register
router.post("/register", auhtController.createUser);

// user login
router.post("/login", auhtController.loginUser);

// auth/me
router.get("/me", authMiddlware.auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.TECHNICIAN), auhtController.getMyProfile)

// create a new refresh token
router.post("/refresh-token", auhtController.newAccessToken);


export const authRouter = router;