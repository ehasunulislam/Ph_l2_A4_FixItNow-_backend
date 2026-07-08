import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sedndResponse";
import { adminService } from "./admin.service";

// get all uer 
const getAllUsers = catchAsync(async (req, res) => {
  const result = await adminService.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result,
  });
});

// update status
const updateUserStatus = catchAsync(async (req, res) => {
    const id = req.params.id as string;
    const payload = req.body;

  const updateUser = await adminService.updateUserStatusIntoDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: {
        updateUser
    },
  });
});


//  get all booking
const getAllBookings = catchAsync(async (req, res) => {
  const result = await adminService.getAllBookingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});


export const adminController = {
    getAllUsers, 
    updateUserStatus,
    getAllBookings
}