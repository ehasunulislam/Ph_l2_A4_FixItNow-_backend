import { Router } from "express";
import { auhtController } from "./auth.controller";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();


router.post("/register", auhtController.createUser);

router.post("/login", auhtController.loginUser);

router.get("/me", authMiddlware.auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.TECHNICIAN), auhtController.getMyProfile)


router.post("/refresh-token", auhtController.newAccessToken);


export const authRouter = router;