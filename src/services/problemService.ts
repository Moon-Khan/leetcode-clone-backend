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
}

export default new ProblemService();
