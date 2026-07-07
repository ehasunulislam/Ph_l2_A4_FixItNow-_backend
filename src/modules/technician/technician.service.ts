import { prisma } from "../../lib/prisma"
import { ITechnicianProfilePayload } from "./technician.interfece";


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
const getSingleTechnicianProfileByIdFromDB  = async(userId: string) => {
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            id: userId
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            },
            services: {
                include: {
                    category: true,
                }
            }
        },
    });

    return technician
}


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
    updateTechnicianProfileIntoDB
}