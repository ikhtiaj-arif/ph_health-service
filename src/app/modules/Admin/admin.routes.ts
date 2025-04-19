import express, { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";
const router = express.Router();

router.get("/", adminController.getAllFromDb);
router.get("/:id", adminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  adminController.updateIntoDB
);
router.delete("/:id", adminController.deleteFromDB);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const AdminRoutes = router;
