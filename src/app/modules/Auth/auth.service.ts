import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { appendFile } from "fs";
import { hash } from "crypto";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_secret as Secret
    );
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decodedData.email,
        status: UserStatus.ACTIVE,
      },
    });

    const accessToken = jwtHelpers.generateToken(
      {
        email: userData.email,
        role: userData.role,
      },
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
    );

    return {
      accessToken,
      needPasswordChange: userData.needPasswordChange,
    };
  } catch (err) {
    throw new Error("You are not authorized!");
  }
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect Password!");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const resetPasswordToken = jwtHelpers.generateToken(
    { email: payload.email, role: userData.role },
    config.jwt.reset_pass_secret as string,
    config.jwt.reset_pass_token_exp_in as string
  );
  console.log(resetPasswordToken);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
