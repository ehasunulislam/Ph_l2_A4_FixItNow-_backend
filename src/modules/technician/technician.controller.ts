import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { techicianService } from "./technician.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";


// getTechnicianProfile controller 
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


// getAllTechnicianProfileFromDB controller
const getAllTechnicianProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const profile  = await techicianService.getAllTechnicianProfileFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile retrieved successfully",
        data: {
            profile
        },
    });
});

// get the technician with id
const getSingleTechnicianProfileById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const getSIngleProfile = await techicianService.getSingleTechnicianProfileByIdFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile retrieved successfully",
      data: {
        getSIngleProfile
      },
    });
})


// update TechnicianProfile controller
const updateTechnicianProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const profile = await techicianService.updateTechnicianProfileIntoDB(
        req.user?.id as string,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile updated successfully",
        data: {
            profile
        },
  });
})


export const technicianController = {
    getTechnicianProfile,
    getAllTechnicianProfile,
    getSingleTechnicianProfileById,
    updateTechnicianProfile
}