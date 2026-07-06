import { Router } from "express";
import { userController } from "./user.controller";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { authMiddlware } from "../../middleware/auth.middleware";


const router = Router();

router.post("/register", userController.createUser);

router.get("/me", authMiddlware.auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.TECHNICIAN), userController.getMyProfile)


export const userRoutes = router;