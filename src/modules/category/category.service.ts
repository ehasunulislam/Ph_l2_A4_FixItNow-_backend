import { prisma } from "../../lib/prisma";
import { ICategoryPayload } from "./category.interface";

// create category
const createCategoryIntoDB = async (payload: ICategoryPayload) => {
    const isExists = await prisma.category.findFirst({
        where: {
            OR: [
                { name: payload.name },
                { slug: payload.slug }
            ]
        }
    })

    if (isExists) {
        throw new Error("Category already exists");
    }

    const category = await prisma.category.create({
        data: payload
    });

    return category
};


// All category
const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return categories;
};


// update category
const updateCategoryIntoDB = async (id: string, payload: Partial<ICategoryPayload>) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id
    }
  });

  if (payload.name) {
    const existsName = await prisma.category.findFirst({
      where: {
        name: payload.name,
        NOT: {
          id
        }
      }
    });

    if (existsName) {
      throw new Error("Category name already exists");
    }
  }

  if (payload.slug) {
    const existsSlug = await prisma.category.findFirst({
      where: {
        slug: payload.slug,
        NOT: {
          id
        }
      }
    });

    if (existsSlug) {
      throw new Error("Category slug already exists");
    }
  }

  const category = await prisma.category.update({
    where: {
      id
    },
    data: payload
  });

  return category;
};


// delete category
const deleteCategoryFromDB = async (id: string) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id
    }
  });

  await prisma.category.delete({
    where: {
      id
    }
  });

  return null;
};


export const CategorySergvice = {
    createCategoryIntoDB, 
    getAllCategoriesFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB
}