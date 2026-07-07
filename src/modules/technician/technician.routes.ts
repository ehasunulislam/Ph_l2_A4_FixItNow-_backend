import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

// get the technecian profile
router.get("/profile", authMiddlware.auth(UserRole.TECHNICIAN), technicianController.getTechnicianProfile);

// get all technician
router.get("/", technicianController.getAllTechnicianProfile);

// get the technician's all booking 
router.get("/bookings", authMiddlware.auth(UserRole.TECHNICIAN), technicianController.getTechnicianBookings);

// update the technecian profile
router.put("/profile",authMiddlware.auth(UserRole.TECHNICIAN),technicianController.updateTechnicianProfile);


// get technician by id
router.get("/:id", technicianController.getSingleTechnicianProfileById);

// update the technician status ACCEPTED or DECLINE
router.patch("/:id/status", authMiddlware.auth(UserRole.TECHNICIAN), technicianController.updateBookingStatus)




export const technicianRouter = router