import { prisma } from "../../lib/prisma";
import { IBookingPayload } from "./booking.interface";

// create booking 
const createBookingIntoDB = async(userId: string, payload: IBookingPayload) => {
    const customer = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    const service = await prisma.service.findUnique({
        where: {
            id: payload.serviceId
        }
    });

    if (!service) {
        throw new Error("Service not found");
    }

    const availability = await prisma.availability.findUnique({
        where: {
        id: payload.availabilityId,
        },
    });

    if (!availability) {
        throw new Error("Availability not found");
    }

    if (availability.isBooked) {
        throw new Error("This availability slot is already booked");
    }

    const booking = await prisma.booking.create({
        data: {
            customerId: customer.id,
            technicianProfileId: service.technicianProfileId,
            serviceId: service.id,
            availabilityId: availability.id,

            bookingDate: availability.date,
            address: payload.address,
            note: payload.note
        },
        include: {
            customer: true,
            technicianProfile: {
                include: {
                    user: {
                        omit: {
                            password: true
                        }
                    }
                }
            },
            service: {
                include: {
                    category: true
                }
            },
            availability: true
        }
    });

    await prisma.availability.update({
        where: {
            id: availability.id,           
        },
        data: {
            isBooked: true
        }
    });

    return booking
}


// Get My Bookings
const getMyBookingsFromDB = async (userId: string) => {
  return await prisma.booking.findMany({
    where: {
      customerId: userId,
    },
    include: {
      technicianProfile: {
        include: {
          user: true,
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
};


// get booking by id
const getSingleBookingFromDB = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
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
      service: {
        include: {
          category: true,
        },
      },
      availability: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};


export const bookingService = {
    createBookingIntoDB,
    getMyBookingsFromDB,
    getSingleBookingFromDB
}