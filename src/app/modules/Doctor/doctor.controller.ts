import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { doctorFilterableFields } from "./doctor.constant";
import { doctorService } from "./doctor.service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";


const getAllFromDB = catchAsync(async (req: Request , res: Response) => {
    const filters = pick(req.query, doctorFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await doctorService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctors retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await DoctorService.getByIdFromDB(id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Doctor retrieval successfully',
//         data: result,
//     });
// });

const updateIntoDB = catchAsync(async(req, res) => {
    console.log(req.body);
    const {id} = req.params
    const result  = await doctorService.updateIntoDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor data updated successfully!",
        data: result
    })
})

export const doctorController = {
    updateIntoDB,getAllFromDB
}