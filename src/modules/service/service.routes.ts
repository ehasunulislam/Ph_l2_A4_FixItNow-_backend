import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { serviceController } from "./service.controller";

const router = Router();

// post create service 
router.post("/", authMiddlware.auth(UserRole.TECHNICIAN), serviceController.createService);


// get all ervice
router.get("/", serviceController.getAllServices);

export const serviceRouter = router