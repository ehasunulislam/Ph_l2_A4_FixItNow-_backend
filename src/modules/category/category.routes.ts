import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();

// get all category
router.get("/", categoryController.getAllCategories);

// post a category
router.post(
  "/",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.createCategory
);

// update category
router.patch(
  "/:id",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.updateCategory
);

// delete category
router.delete(
  "/:id",
  authMiddlware.auth(UserRole.ADMIN),
  categoryController.deleteCategory
);



export const categoryRouter = router;