import { title } from "node:process";
import { prisma } from "../../lib/prisma"
import { IServicePayload, IServiceQuery, IUpdateServicePayload } from "./service.interface"

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
const getAllServicesFromDB = async (query: IServiceQuery) => {
  const {
    search,
    type,
    location,
    rating,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const where = {
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(type && {
      category: {
        name: {
          contains: type,
          mode: "insensitive" as const,
        },
      },
    }),

    ...(location && {
      technicianProfile: {
        location: {
          contains: location,
          mode: "insensitive" as const,
        },
      },
    }),

    ...(rating && {
      technicianProfile: {
        averageRating: {
          gte: Number(rating),
        },
      },
    }),
  };

  const total = await prisma.service.count({
    where,
  });

  const services = await prisma.service.findMany({
    where,

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

    skip,
    take: limitNumber,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: services,
  };
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