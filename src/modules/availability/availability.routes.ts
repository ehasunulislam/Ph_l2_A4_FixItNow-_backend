import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { availabilityController } from "./availability.controller";

const router = Router();

// availability post
router.post(
  "/availability",
  authMiddlware.auth(UserRole.TECHNICIAN),
  availabilityController.createAvailability
);

// availability get
router.get(
  "/availability",
  authMiddlware.auth(UserRole.TECHNICIAN),
  availabilityController.getMyAvailability
);

// update
router.put(
  "/availability/:id",
  authMiddlware.auth(UserRole.TECHNICIAN),
  availabilityController.updateAvailability
);


// delete
router.delete(
  "/availability/:id",
  authMiddlware.auth(UserRole.TECHNICIAN),
  availabilityController.deleteAvailability
);

export const availabilityRouter = router;