import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

router.get(
  "/profile",
  authMiddlware.auth(UserRole.TECHNICIAN),
  technicianController.getTechnicianProfile
);


export const technicianRouter = router