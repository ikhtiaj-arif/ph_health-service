import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { adminService } from "./admin.service";
import e from "cors";
import catchAsync from "../../../shared/catchAsync";


const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await adminService.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins fetched successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await adminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins data updated",
      data: result,
    });
  }
);
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
 
  const { id } = req.params;
  const result = await adminService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins data deleted",
    data: result,
  });

})
const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await adminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins data deleted",
      data: result,
    });

})

export const adminController = {
  getAllFromDb,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
