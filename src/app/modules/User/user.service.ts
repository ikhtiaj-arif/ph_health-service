// import { UserRole } from "../../../generated/prisma";

import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";

// import { UserRole } from "@prisma/client";

const createAdmin = async (req: any) => {
  // console.log("serv",  req.body);

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    console.log("uploaded", uploadToCloudinary);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(req.body);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // console.log({hashedPassword});

  const userData = {
    email: req.body.admin.email,
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
      data: req.body.admin,
    });
    return createdAdminData;
  });
  return result;
};
const createDoctor = async (req: any) => {
  // console.log("serv",  req.body);

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // console.log({hashedPassword});

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    //transaction 1
    await transactionClient.user.create({
      data: userData,
    });

    //transaction 2
    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return createdDoctorData;
  });
  return result;
};

export const userService = {
  createAdmin,
  createDoctor,
};
