import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { doctorSearchableFields } from "./doctor.constant";
import { IPaginationOptions } from "../../Interfaces/pagination";
import { IDoctorFilterRequest } from "./doctor.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { spec } from "node:test/reporters";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  // console.log(specialties);

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (trxClient) => {
    await prisma.doctor.update({
      where: {
        id,
      },
      data: doctorData,
    });

    if (specialties && specialties.length > 0) {
      // Fro deleting specialties
      const deleteSpecialtiesIds = specialties.filter(
        (specialty) => specialty.isDeleted
      );

      for (const specialty of deleteSpecialtiesIds) {
        await trxClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }
      //   create specialties
      const createSpecialtiesIds = specialties.filter(
        (specialty) => !specialty.isDeleted
      );

      for (const specialty of createSpecialtiesIds) {
        await trxClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return result;
};
const getAllFromDB = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
      andConditions.push({
          OR: doctorSearchableFields.map(field => ({
              [field]: {
                  contains: searchTerm,
                  mode: 'insensitive',
              },
          })),
      });
  }

  // doctor > dcSpecialties > title
  if(specialties && specialties.length){
    andConditions.push({
      doctorSpecialties: {
        some:{ specialties: {
          title: {
            contains: specialties,
            mode: 'insensitive'
          }
        }}
      }
    })
  }


  if (Object.keys(filterData).length > 0) {
      const filterConditions = Object.keys(filterData).map(key => ({
          [key]: {
              equals: (filterData as any)[key],
          },
      }));
      andConditions.push(...filterConditions);
  }

  andConditions.push({
      isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'desc' },
      include: {
          doctorSpecialties: {
              include: {
                specialties: true
              }
          }
      },
  });

  const total = await prisma.doctor.count({
      where: whereConditions,
  });

  return {
      meta: {
          total,
          page,
          limit,
      },
      data: result,
  };
};


export const doctorService = {
  updateIntoDB,getAllFromDB
};
