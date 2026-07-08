import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { paymentController } from "./payment.controllers";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post("/create", authMiddlware.auth(UserRole.CUSTOMER), paymentController.cretepayment);
router.post("/confirm", authMiddlware.auth(UserRole.CUSTOMER), paymentController.confirmPayment);

export const paymentRouter = router;