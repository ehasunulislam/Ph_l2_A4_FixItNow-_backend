import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { Service } from "./service.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

// post create service 
const  createService = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const service = await Service.createServiceFromDB(userId, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "service created successfully",
      data: {
        service
      }
    });
});


// getAll service
const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const services = await Service.getAllServicesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Services retrieved successfully",
      data: {
        services
      },
    });
  }
);

export const serviceController = {
    createService,
    getAllServices
}