import { prisma } from "../../../shared/prisma";

const getMyProfile = async (userId: string) => {
    const result = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });
    return result;
};

export const UserService = {
    getMyProfile,
};
