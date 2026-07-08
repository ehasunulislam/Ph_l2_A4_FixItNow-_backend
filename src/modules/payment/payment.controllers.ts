import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

// payment create in stripe 
const cretepayment = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id as string;
    const payload = req.body;

    const payment = await paymentService.createPaymentIntentIntoDB(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Checkout session created successfully",
      data: {
        payment
      }
    });
});


// payment intsert into DB
const confirmPayment = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const sessionId = req.body.sessionId;

    const payment = await paymentService.confirmPaymentService(id as string, sessionId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Payment confirmed successfully",
      data: {
        payment
      }
    });
});



// get all payment
const getMyPayments  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id as string

    const paymentHistory = await paymentService.getMyPaymentsFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Payment history",
      data: {
        paymentHistory
      }
    });
});


// get payment by id
const getSinglePayment = catchAsync(async (req, res) => {
    const id = req.user?.id as string;
    const role = req.user?.role as string;
    const payload = req.params.id  as string;

  const result = await paymentService.getSinglePaymentFromDB(id, role, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment retrieved successfully",
    data: result,
  });
});


export const paymentController = {
    cretepayment,
    confirmPayment,
    getMyPayments,
    getSinglePayment
}