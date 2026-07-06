import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwtUtils";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.createUserFromDB(payload);

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

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessableToken } = req.cookies;
    console.log(accessableToken);

    const verifiedToken = jwtUtils.verifyToken(
      accessableToken,
      config.jwt_access_secret,
    );

    if (!verifiedToken.success) {
        throw new Error(verifiedToken.error);
    }

    const { id } = verifiedToken.data as JwtPayload;

    const result = await userService.getProfileFromDB(id);

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

export const userController = {
  createUser,
  getMyProfile,
};
