import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { availabilityService } from "./availability.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

// availability post
const createAvailability = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;

    const availability = await availabilityService.createAvailabilityIntoDB(userId as string, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Availability created successfully",
      data: {
        availability
      }
    });
});


// availability get all
const getMyAvailability = catchAsync(async (req, res) => {
  const payload = req.user?.id as string;

  const availability = await availabilityService.getMyAvailabilityFromDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Availability retrieved successfully",
    data: {
        availability
    }
  });
});


// update availability
const updateAvailability = catchAsync(async (req, res) => {
  const result = await availabilityService.updateAvailabilityFromDB(
      req.user!.id,
      req.params.id as string,
      req.body
    );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Availability updated successfully",
    data: result,
  });
});



const deleteAvailability = catchAsync(async (req, res) => {
  await availabilityService.deleteAvailabilityFromDB(
    req.user!.id,
    req.params.id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Availability deleted successfully",
    data: null,
  });
});


export const availabilityController = {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability,
};