import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", categoryController.getAllCategories);

// Admin
router.post(
  "/",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.createCategory
);

router.patch(
  "/:id",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.deleteCategory
);



export const categoryRouter = router;