import { Router } from "express";
import { auhtController } from "./auth.controller";

const router = Router();

router.post("/login", auhtController.loginUser);

router.post("/refresh-token", auhtController.newAccessToken)


export const authRouter = router;