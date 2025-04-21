import express from "express"
import { AuthController } from "./auth.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { userRoutes } from "../User/user.route"

const router = express.Router()

router.post(
    "/login",
    AuthController.loginUser
)
router.post(
    "/refresh-token",
    AuthController.refreshToken
)
router.post(
    "/change-password",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    AuthController.changePassword
)
router.post(
    "/forgot-password",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    AuthController.forgotPassword
)


export const AuthRoutes = router 