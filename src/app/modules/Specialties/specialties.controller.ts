import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialtiesService } from "./specialties.service";
import { Request, Response } from "express";

const InsertIntoDb = catchAsync(async (req:Request, res: Response) => {

  const result = await specialtiesService.InsertIntoDb(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

export const specialtiesController = {
  InsertIntoDb,
};
