import { Router } from "express";
import { authMiddlware } from "../../middleware/auth.middleware";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { serviceController } from "./service.controller";

const router = Router();

// post create service 
router.post("/", authMiddlware.auth(UserRole.TECHNICIAN), serviceController.createService);


// get all ervice
router.get("/", serviceController.getAllServices);


// get the single service by id
router.get("/:id", serviceController.getSingleService);


// update the service
router.patch("/:id", authMiddlware.auth(UserRole.TECHNICIAN), serviceController.updateService);


// delete the service
router.delete( "/:id", authMiddlware.auth(UserRole.TECHNICIAN), serviceController.deleteService);


export const serviceRouter = router