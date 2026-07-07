import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

// create booking 
router.post("/", authMiddlware.auth(UserRole.CUSTOMER) ,bookingController.createBooking);


// Get My Bookings
router.get("/", authMiddlware.auth(UserRole.CUSTOMER), bookingController.getMyBookings);

// get booking by id
router.get("/:id", authMiddlware.auth(UserRole.CUSTOMER), bookingController.getSingleBooking);



export const bookingRouter = router;