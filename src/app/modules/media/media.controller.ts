import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { fileUploader } from "../../../helpers/fileUploader";

const uploadFile = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        throw new Error("Please upload a file");
    }
    const uploadResult = await fileUploader.uploadToCloudinary(file);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "File uploaded successfully!",
        data: uploadResult,
    });
});

export const MediaController = {
    uploadFile,
};
