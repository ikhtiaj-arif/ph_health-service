// import { UserRole } from "../../../generated/prisma";

import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";

// import { UserRole } from "@prisma/client";


const createAdmin = async (payload: any) => {

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  // console.log({hashedPassword});

  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    //transaction 1
    await transactionClient.user.create({
      data: userData,
    });

    //transaction 2
    const createdAdminData = await transactionClient.admin.create({
      data: payload.admin,
    });
    return createdAdminData;
  });
  return result;
};

export const userService = {
  createAdmin,
};
