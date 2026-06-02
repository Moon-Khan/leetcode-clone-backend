import { Difficulty } from "@prisma/client";
import { BaseController } from "../controllers/baseController.js";
import { prisma } from "../models/index.js";

class ProblemService extends BaseController {
    async createProblem(
        title: string,
        description: string,
        constraints: string,
        difficulty: Difficulty,
        examples: object
    ) {
        try {
            const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

            const problem = await prisma.$transaction(async (tx) => {
                const existingProblem = await tx.problem.findUnique({ where: { slug } });
                if (existingProblem) {
                    throw new Error("Problem already exists");
                }

                return await tx.problem.create({
                    data: { title, slug, description, constraints, difficulty, examples },
                });
            });

            return problem;
        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error("Failed to create problem");
        }
    }

    async getAllProblems() {
        try {
            return await prisma.problem.findMany({
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                    createdAt: true,
                    tags: { select: { tag: { select: { id: true, name: true } } } },
                },
            });
        } catch (error) {
            throw new Error("Failed to fetch problems");
        }
    }

    async getProblemById(id: string) {
        try {
            const problem = await prisma.problem.findUnique({
                where: { id },
                include: {
                    tags: { select: { tag: { select: { id: true, name: true } } } },
                    testCases: {
                        where: { isHidden: false },
                        select: { id: true, input: true, expectedOutput: true },
                    },
                },
            });
            if (!problem) throw new Error("Problem not found");
            return problem;
        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error("Failed to fetch problem");
        }
    }

    async updateProblem(
        id: string,
        data: Partial<{
            title: string;
            description: string;
            constraints: string;
            difficulty: Difficulty;
            examples: object;
        }>
    ) {
        try {
            const existing = await prisma.problem.findUnique({ where: { id } });
            if (!existing) throw new Error("Problem not found");

            const updateData: Parameters<typeof prisma.problem.update>[0]["data"] = { ...data };

            if (data.title) {
                updateData.slug = data.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "");
            }

            return await prisma.problem.update({ where: { id }, data: updateData });
        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error("Failed to update problem");
        }
    }

    async deleteProblem(id: string) {
        try {
            const existing = await prisma.problem.findUnique({ where: { id } });
            if (!existing) throw new Error("Problem not found");
            await prisma.problem.delete({ where: { id } });
        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error("Failed to delete problem");
        }
    }
}

export default new ProblemService();
