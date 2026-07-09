import express from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { reviewController } from "./reviews.controller";


const router = express.Router();

// post a review
router.post("/", authMiddlware.auth(UserRole.CUSTOMER), reviewController.createReview);


// get all review
router.get("/", reviewController.getAllReview);


// get all of my reviews
router.get("/my-reviews", authMiddlware.auth("CUSTOMER") ,reviewController.getAllReviewsWithLoginUser);

export const reviewRoutes = router;