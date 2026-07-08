import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { paymentController } from "./payment.controllers";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

// create payment 
router.post("/create", authMiddlware.auth(UserRole.CUSTOMER), paymentController.cretepayment);

// confrim payment
router.post("/confirm", authMiddlware.auth(UserRole.CUSTOMER), paymentController.confirmPayment);

// get payment history
router.get("/", authMiddlware.auth(UserRole.CUSTOMER), paymentController.getMyPayments);


// get payment history by id
router.get("/:id", authMiddlware.auth(UserRole.CUSTOMER, UserRole.ADMIN), paymentController.getSinglePayment);

export const paymentRouter = router;