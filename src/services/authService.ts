import { prisma } from "../models/index.js";

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};
