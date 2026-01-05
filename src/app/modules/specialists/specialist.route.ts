import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SpecialistController } from "./specialist.controller";
import { SpecialistValidation } from "./specialist.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(SpecialistValidation.createSpecialistZodSchema),
    SpecialistController.createSpecialist
);

router.get("/", SpecialistController.getAllSpecialists);

router.get("/:id", SpecialistController.getSingleSpecialist);

router.patch(
    "/:id",
    validateRequest(SpecialistValidation.updateSpecialistZodSchema),
    SpecialistController.updateSpecialist
);

router.delete("/:id", SpecialistController.deleteSpecialist);

export const SpecialistRoutes = router;
