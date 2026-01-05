import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    // Assuming auth middleware adds user to req.user
    const { userId } = (req as any).user;
    const result = await UserService.getMyProfile(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully!",
        data: result,
    });
});

export const UserController = {
    getMyProfile,
};
