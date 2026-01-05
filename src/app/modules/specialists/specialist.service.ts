import { Prisma, specialists } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createSpecialist = async (data: any): Promise<specialists> => {
    const result = await prisma.specialists.create({
        data,
    });
    return result;
};

const getAllSpecialists = async (
    filters: any,
    options: any
): Promise<specialists[]> => {
    const { searchTerm, ...filterData } = filters;
    const { page, limit, sortBy, sortOrder } = options;
    // logic for filters/pagination...

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: ["title", "description", "slug"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    // Clean up conditions if empty
    const whereConditions: Prisma.specialistsWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.specialists.findMany({
        where: whereConditions,
        // skip, take, orderBy...
    });
    return result;
};

const getSingleSpecialist = async (id: string): Promise<specialists | null> => {
    const result = await prisma.specialists.findUnique({
        where: {
            id,
        },
        include: {
            media: true,
            service_offerings: true,
        }
    });
    return result;
};

const updateSpecialist = async (
    id: string,
    payload: Partial<specialists>
): Promise<specialists> => {
    const result = await prisma.specialists.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};

const deleteSpecialist = async (id: string): Promise<specialists> => {
    const result = await prisma.specialists.delete({
        where: {
            id,
        },
    });
    return result;
};

export const SpecialistService = {
    createSpecialist,
    getAllSpecialists,
    getSingleSpecialist,
    updateSpecialist,
    deleteSpecialist,
};
