import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";



const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authService.createUserFromDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  },
);


const loginUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const  {accessToken, refreshToken} = await authService.loginUserFromDB(payload);

    res.cookie("accessableToken", accessToken, {
        httpOnly: true,
        secure: true, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    res.cookie("refreshableToken", refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken
        }
    })
});



const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.getProfileFromDB(req.user?.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: {
        result
      }
    })
  }
);



const newAccessToken = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshableToken;

    const accessToken = await authService.createNewAccessToken(refreshToken);

    res.cookie("myToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24  // 1 day 
    });


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refresh successfully",
        data: {
            accessToken
        }
    })
})

export const auhtController = {
    createUser,
    loginUser,
    getMyProfile,
    newAccessToken
}