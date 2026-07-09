import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./reviews.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";

// create review
const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id as string;
    const payload = req.body;

    const reviws = await reviewService.createReviewIntoDB(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category deleted successfully",
      data: {
        reviws
      }
    });
})


// get review
const getAllReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const reviews = await reviewService.getAllReviewFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "show all reviews successfully",
    data: {
      reviews
    }
  });
})

// get review with login user
const getAllReviewsWithLoginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user?.id as  string;

  const review = await reviewService.getAllReviewsWithLoginUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "show all reviwes with logged in user successfully",
    data: {
      review
    }
  });
})


export const reviewController = {
  createReview,
  getAllReview,
  getAllReviewsWithLoginUser
};