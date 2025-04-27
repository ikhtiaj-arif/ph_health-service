import express from "express"
import { doctorController } from "./doctor.controller"

const router = express.Router()
// task 3
router.get('/', doctorController.getAllFromDB);

//task 4
// router.get('/:id', doctorController.getByIdFromDB);

router.patch("/:id", doctorController.updateIntoDB )



export const DoctorRoutes = router