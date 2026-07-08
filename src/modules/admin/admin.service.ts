import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateUserStatusPayload } from "./admin.interface";


// get all uer 
const getAllUsersFromDB = async () => {
  return await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
};


// update status
const updateUserStatusIntoDB = async (userId: string, payload: IUpdateUserStatusPayload) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status: payload.status,
        },
        omit: {
            password: true,
        },
    });
};


//  get all booking
const getAllBookingsFromDB = async () => {
  return await prisma.booking.findMany({
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      technicianProfile: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
      service: true,
      payment: true,
    },
  });
};


export const adminService = {
    getAllUsersFromDB,
    updateUserStatusIntoDB,
    getAllBookingsFromDB
}