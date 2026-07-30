import { BookingStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { ITechnicianProfilePayload, IUpdateBookingStatus } from "./technician.interfece";


// getTechnicianProfile service
const getTechnicianProfileFromDB = async(userId: string) => {
    const profile = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    return profile
};


// get all Technician 
const getAllTechnicianProfileFromDB = async(filter: any) => {
    const { searchTerm, location, type} = filter;
    const whereConditions: any = {};

    if (searchTerm) {
        whereConditions.OR = [
        {
            location: {
                contains: searchTerm,
                mode: 'insensitive', 
            },
        },
        {
            bio: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        },
        {
            user: {
                name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
        },
        ];
    }

    if (location) {
        whereConditions.location = {
            contains: location,
            mode: 'insensitive',
        };
    }

    const profile = await prisma.technicianProfile.findMany({
        where: whereConditions,
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });
    return profile
}

// get the technician with id
const getSingleTechnicianProfileByIdFromDB = async (userId: string) => {
  return await prisma.technicianProfile.findUnique({
    where: {
       userId,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },

      services: {
        include: {
          category: true,
        },
      },

      availability: {
        orderBy: {
          date: "asc",
        },
      },

     reviews: {
        include: {
            customer: {
            omit: {
                password: true,
            },
            },

            booking: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    },
    },
  });
};


// get the technician's all booking 
const getTechnicianBookingsFromDB = async (userId: string) => {
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!technician) {
        throw new Error("Technician profile not found");
    }

    const bookings = await prisma.booking.findMany({
        where: {
            technicianProfileId: technician.id,
        },
        include: {
            customer: {
                omit: {
                    password: true,
                },
            },
            service: {
                include: {
                    category: true,
                },
            },
            availability: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return bookings;
};


// get the technician's booking -> update
const updateBookStausFromDB = async ( userId: string, bookingId: string, payload: IUpdateBookingStatus
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.technicianProfileId !== technician.id) {
    throw new Error("You are not authorized to update this booking");
  }

  // REQUESTED -> ACCEPTED / DECLINED
  if (booking.status === BookingStatus.REQUESTED) {
    if (
      payload.status !== BookingStatus.ACCEPTED &&
      payload.status !== BookingStatus.DECLINED
    ) {
      throw new Error(
        "Requested booking can only be ACCEPTED or DECLINED"
      );
    }
  }

  // PAID -> IN_PROGRESS
  else if (booking.status === BookingStatus.PAID) {
    if (payload.status !== BookingStatus.IN_PROGRESS) {
      throw new Error(
        "Paid booking can only be moved to IN_PROGRESS"
      );
    }
  }

  // IN_PROGRESS -> COMPLETED
  else if (booking.status === BookingStatus.IN_PROGRESS) {
    if (payload.status !== BookingStatus.COMPLETED) {
      throw new Error(
        "In-progress booking can only be marked COMPLETED"
      );
    }
  }

  // DECLINED / COMPLETED
  else {
    throw new Error("Booking can no longer be updated");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: payload.status,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      availability: true,
    },
  });

  return updatedBooking;
};

// update TechnicianProfile service 
const updateTechnicianProfileIntoDB  = async(userId: string, payload: ITechnicianProfilePayload) => {
    const profile = await prisma.technicianProfile.update({
        where: {
            userId
        }, 
        data: payload,
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    return profile
}


export const techicianService = {
    getTechnicianProfileFromDB,
    getAllTechnicianProfileFromDB,
    getSingleTechnicianProfileByIdFromDB,
    getTechnicianBookingsFromDB,
    updateBookStausFromDB,
    updateTechnicianProfileIntoDB
}