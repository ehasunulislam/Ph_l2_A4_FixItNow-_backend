import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

// get the technecian profile
router.get(
  "/profile",
  authMiddlware.auth(UserRole.TECHNICIAN),
  technicianController.getTechnicianProfile
);

// get all technician
router.get("/", technicianController.getAllTechnicianProfile);


// get technician by id
router.get("/:id", technicianController.getSingleTechnicianProfileById);


// update the technecian profile
router.put(
  "/profile",
  authMiddlware.auth(UserRole.TECHNICIAN),
  technicianController.updateTechnicianProfile
);


export const technicianRouter = router