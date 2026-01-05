import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/me",
  auth(
    UserRole.ADMIN,
    UserRole.USER,
    UserRole.SPECIALIST,
    UserRole.SUPER_ADMIN
  ),
  UserController.getMyProfile
);

export const UserRoutes = router;
