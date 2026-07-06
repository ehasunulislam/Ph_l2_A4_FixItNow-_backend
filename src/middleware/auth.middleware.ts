import { UserRole } from "../../prisma/generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../utils/jwtUtils";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: UserRole
            }
        }
    }
}



const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessableToken ? req.cookies.accessableToken : 
                      req.headers.authorization ?.
                      startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1]: 
                      req.headers.authorization;

        if(!token) {
            throw new Error("Youb are not logged in. Please login to access this resources");
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }

        const {id,  name, email, role} = verifiedToken.data as JwtPayload;

        if(requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to accesds this resouce")
        }

        const user = await prisma.user.findUnique({
            where: {
                id,
                name, 
                email, 
                role
            }
        })

        if(!user) {
            throw new Error("User not found. please log in again")
        }

        if(user.status === "BLOCKED") {
            throw new Error("Your account has been blocked. please contact support")
        }

        req.user = {
            id, name,email, role
        }

        next()
    })
}


export const authMiddlware = {
    auth
}