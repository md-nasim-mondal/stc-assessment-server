import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync"; // Assuming this exists
import sendResponse from "../../../shared/sendResponse"; // Assuming this exists
import { SpecialistService } from "./specialist.service";

const createSpecialist = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialistService.createSpecialist(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Specialist created successfully!",
        data: result,
    });
});

const getAllSpecialists = catchAsync(async (req: Request, res: Response) => {
    const params = req.query;
    const filters: any = {};
    if (params.filter === "Drafts") {
        filters.is_draft = true;
    } else if (params.filter === "Published") {
        filters.is_draft = false;
    }
    if (params.search) {
        filters.searchTerm = params.search;
    }

    // Pass other query params as filters if needed
    // const filters = pick(req.query, ['searchTerm', 'filter', ...]);

    const result = await SpecialistService.getAllSpecialists(filters, {});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialists retrieved successfully!",
        data: result,
    });
});

const getSingleSpecialist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialistService.getSingleSpecialist(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialist retrieved successfully!",
        data: result,
    });
});

const updateSpecialist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialistService.updateSpecialist(id as string, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialist updated successfully!",
        data: result,
    });
});

const deleteSpecialist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialistService.deleteSpecialist(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialist deleted successfully!",
        data: result,
    });
});

export const SpecialistController = {
    createSpecialist,
    getAllSpecialists,
    getSingleSpecialist,
    updateSpecialist,
    deleteSpecialist,
};
