import { title } from "node:process";
import { prisma } from "../../lib/prisma"
import { IServicePayload, IUpdateServicePayload } from "./service.interface"

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

// get all services
const getAllServicesFromDB = async () => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      technicianProfile: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return services;
};


// update the service
const updateServiceFromDB = async (serviceId: string, payload: IUpdateServicePayload) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const result = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};


// delete the service
const deleteServiceFromDB = async (serviceId: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return null;
};

export const Service = {
    createServiceFromDB,
    getAllServicesFromDB,
    updateServiceFromDB,
    deleteServiceFromDB
}