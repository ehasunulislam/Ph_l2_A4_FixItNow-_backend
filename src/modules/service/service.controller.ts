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
    const query = req.query

    const services = await Service.getAllServicesFromDB(query);

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


// get the single service by id
const getSingleService = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await Service.getSingleServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
    data: result,
  });
}); 


// update the service
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await Service.updateServiceFromDB(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated successfully",
    data: {
        result
    },
  });
});


// delete the controller
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Service.deleteServiceFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service deleted successfully",
    data: null,
  });
});


export const serviceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService
}