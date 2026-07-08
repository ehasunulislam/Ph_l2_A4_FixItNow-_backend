import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.get(
  "/users",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.getAllUsers
);

router.patch(
  "/users/:id",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.updateUserStatus
);

router.get(
  "/bookings",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.getAllBookings
);

export const adminRouter = router