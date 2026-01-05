import express from "express";
import { MediaController } from "./media.controller";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.post(
    "/upload",
    fileUploader.upload.single("file"),
    MediaController.uploadFile
);

export const MediaRoutes = router;
