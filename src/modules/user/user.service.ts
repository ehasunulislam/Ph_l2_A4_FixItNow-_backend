import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUserRegisterPayload } from "./user.interface";
import config from "../../config";

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

export const userService = {
  createUserFromDB,
  getProfileFromDB,
};
