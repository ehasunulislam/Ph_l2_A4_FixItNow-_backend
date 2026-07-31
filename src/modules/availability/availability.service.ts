import { prisma } from "../../lib/prisma";
import { IAvailabilityPayload } from "./availability.interface";


// create available (post)
const createAvailabilityIntoDB = async(userId: string, payload: IAvailabilityPayload) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!technicianProfile) {
        throw new Error("Technician profile not found");
    }

    const existingSlots = await prisma.availability.findMany({
        where: {
            technicianProfileId: technicianProfile.id,
            date: new Date(payload.date),
        },
    });

    // clock mechanigom
    const newStart = payload.startTime;
    const newEnd = payload.endTime;

    const isClockMechanigom = existingSlots.some((slot) => {
        return newStart < slot.endTime && newEnd > slot.startTime
    });

    if (isClockMechanigom) {
        throw new Error("Availability slot overlaps with an existing slot");
    }

    const result = await prisma.availability.create({
        data: {
            technicianProfileId: technicianProfile.id,
            date: new Date(payload.date),
            startTime: payload.startTime,
            endTime: payload.endTime,
            isBooked: false,
        }
    })

    return result
}


// get all available
const getMyAvailabilityFromDB = async (userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const availability = await prisma.availability.findMany({
        where: {
            technicianProfileId: technicianProfile.id,
        },
        orderBy: {
            date: "asc",
        },
    });

  return availability
};


// update available by id
const updateAvailabilityFromDB = async ( userId: string, availabilityId: string, payload: IAvailabilityPayload) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.technicianProfileId !== technicianProfile.id) {
    throw new Error("Unauthorized");
  }

  const existingSlots = await prisma.availability.findMany({
    where: {
      technicianProfileId: technicianProfile.id,
      date: new Date(payload.date),
      NOT: {
        id: availabilityId,
      },
    },
  });

  const overlap = existingSlots.some((slot) => {
    return (
      payload.startTime < slot.endTime &&
      payload.endTime > slot.startTime
    );
  });

  if (overlap) {
    throw new Error(
      "Availability slot overlaps with an existing slot"
    );
  }

  return await prisma.availability.update({
    where: {
      id: availabilityId,
    },
    data: {
      date: new Date(payload.date),
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });
};




// Delete Availability
const deleteAvailabilityFromDB = async (userId: string, availabilityId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.technicianProfileId !== technicianProfile.id) {
    throw new Error("Unauthorized");
  }

  await prisma.availability.delete({
    where: {
      id: availabilityId,
    },
  });

  return null;
};

export const availabilityService = {
  createAvailabilityIntoDB,
  getMyAvailabilityFromDB,
  updateAvailabilityFromDB,
  deleteAvailabilityFromDB,
};