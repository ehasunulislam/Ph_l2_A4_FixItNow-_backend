import { title } from "node:process";
import { prisma } from "../../lib/prisma"
import { IServicePayload } from "./service.interface"

// post create service 
const createServiceFromDB = async(userId: string, payload: IServicePayload) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: {
            userId: userId
        }
    });

    if(!technicianProfile) {
        throw new Error("Technician profile not found");
    }

    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    });

    if (!category) {
        throw new Error("Category not found");
    }

    const service = await prisma.service.create({
        data: {
            technicianProfileId: technicianProfile.id,
            categoryId: payload.categoryId,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            duration: payload.duration,
        },
        include: {
            category: true,
        },
    });

    return service
}

export const Service = {
    createServiceFromDB
}