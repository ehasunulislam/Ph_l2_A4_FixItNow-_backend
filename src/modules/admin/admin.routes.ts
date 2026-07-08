import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { adminController } from "./admin.controller";
import { categoryController } from "../category/category.controller";

const router = Router();

// get all user
router.get(
  "/users",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.getAllUsers
);


// update user status
router.patch(
  "/users/:id",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.updateUserStatus
);


// get all booking
router.get(
  "/bookings",
  authMiddlware.auth(UserRole.ADMIN),
  adminController.getAllBookings
);

// get all categories
router.get(
  "/categories",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.getAllCategories
);


// create category
router.post(
  "/categories",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.createCategory
);

export const adminRouter = router