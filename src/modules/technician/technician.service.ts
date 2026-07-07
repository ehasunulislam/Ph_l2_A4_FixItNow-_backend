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
const getAllTechnicianProfileFromDB = async() => {
    const profile = await prisma.technicianProfile.findMany({
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
    updateTechnicianProfileIntoDB
}