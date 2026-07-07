import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser, IUserRegisterPayload } from "./auth.interface";
import { jwtUtils } from "../../utils/jwtUtils";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";


// user register post
const createUserFromDB = async (payload: IUserRegisterPayload) => {
  const { name, email, password, phone, role, profileImage, address } = payload;

  const isExistsUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExistsUser) {
    throw new Error("User already exists with this email");
  }

  const hasedPassowd = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await prisma.$transaction(async (tx) => {
    // create user
    const createdUser = await tx.user.create({
      data: {
        name,
        email,
        password: hasedPassowd,
        phone,
        role,
        profileImage,
        address,
      },
    });

    if (createdUser.role === "TECHNICIAN") {
      await tx.technicianProfile.create({
        data: {
          userId: createdUser.id,
          hourlyRate: 0,
          location: "",
        },
      });
    }

    const result = await tx.user.findUniqueOrThrow({
        where: {
            id: createdUser.id
        },
        omit: {
            password: true
        },
        include: {
            technicianProfile: true
        }
    })

    return result;
  });

  return user;
};



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

// get profile
const getProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  return user;
};


// giving a new accesstoken
const createNewAccessToken = async(refreshToken: string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);

    if(!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error);
    }

    const {id} = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    if(user.status === "BLOCKED") {
        throw new Error("uesr already blocked");
    }

    const jwtRefreshTokenRestartPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(
        jwtRefreshTokenRestartPayload, 
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    return accessToken
}


export const authService = {
    createUserFromDB,
    loginUserFromDB,
    getProfileFromDB,
    createNewAccessToken
}