import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sedndResponse";

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

export const auhtController = {
    loginUser
}