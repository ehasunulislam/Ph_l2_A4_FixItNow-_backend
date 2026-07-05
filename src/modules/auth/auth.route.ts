import { Router } from "express";
import { auhtController } from "./auth.controller";

const router = Router();

router.post("/login", auhtController.loginUser)


export const authRouter = router;