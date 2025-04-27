import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { specialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { specialtiesValidation } from "./specialties.validation";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single('file'),
  (req:Request, res:Response, next: NextFunction) =>{
    req.body = specialtiesValidation.create.parse(JSON.parse(req.body.data))
    return specialtiesController.InsertIntoDb(req, res, next)
  }
);

export const specialtiesRoutes = router;
