import express from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { reviewController } from "./reviews.controller";


const router = express.Router();

router.post("/", authMiddlware.auth(UserRole.CUSTOMER), reviewController.createReview);

export const reviewRoutes = router;