import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { CategorySergvice } from "./category.service";
import { sendResponse } from "../../utils/sedndResponse";
import httpStatus from "http-status";


const createCategory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const category = await CategorySergvice.createCategoryIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: {
        category
      }
    });
});

const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const categories = await CategorySergvice.getAllCategoriesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: {
        categories
      }
    });
  }
);

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await CategorySergvice.updateCategoryIntoDB(id as string, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category updated successfully",
      data: {
        category
      }
    });
  }
);


const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    await CategorySergvice.deleteCategoryFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category deleted successfully",
      data: null
    });
  }
);


export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
}