import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };

  res.cookie("refreshToken", result.refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
