import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { techicianService } from "./technician.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

const getTechnicianProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => { 
    const profile = await techicianService.getTechnicianProfileFromDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile retrieved successfully",
        data: {
            profile
        },
    });
});

export const technicianController = {
    getTechnicianProfile
}