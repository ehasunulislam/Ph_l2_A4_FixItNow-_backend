import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

const cretepayment = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id as string;
    const payload = req.body;

    const payment = await paymentService.createPaymentIntentIntoDB(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: {
        payment
      }
    });
});


export const paymentController = {
    cretepayment
}