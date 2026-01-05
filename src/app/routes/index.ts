import express from "express";
import { SpecialistRoutes } from "../modules/specialists/specialist.route";
import { MediaRoutes } from "../modules/media/media.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/specialists",
    route: SpecialistRoutes,
  },
  {
    path: "/media",
    route: MediaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
