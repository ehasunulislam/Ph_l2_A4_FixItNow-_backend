import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import { jwtUtils } from "../../utils/jwtUtils";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";

// post of login user
const loginUserFromDB = async(payload: ILoginUser) => {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

    if(user.status === "BLOCKED") {
        throw new Error("you are blocked. please contact support");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword) {
        throw new Error("password is incorrecy");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return {
        accessToken, refreshToken
    }
}


export const authService = {
    loginUserFromDB
}