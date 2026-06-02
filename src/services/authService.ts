import { BaseController } from "../controllers/baseController.js";
import { prisma } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { AuthUser } from "../middlewares/authMiddleware.js";
class UserService extends BaseController {

    private sign(user: AuthUser) {
        const secretToken: Secret = process.env.JWT_SECRET as string;
        const expiresIn: string = process.env.JWT_EXPIRES_IN as string;

        if (!secretToken || !expiresIn) {
            throw new Error("JWT_SECRET or JWT_EXPIRES_IN is not defined in environment");
        }

        const expires: SignOptions["expiresIn"] = (expiresIn ?? "2d") as SignOptions["expiresIn"];
        return jwt.sign(user, secretToken, { expiresIn: expires });
    }

    async getAllUsers() {
        try {
            return await prisma.user.findMany();
        } catch (error) {
            throw new Error("Failed to fetch users");
        }
    }

    async getUser(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                throw new Error("Invalid password");
            }

            const token = this.sign({ id: user.id, email: user.email });
            return { token };

        } catch (error) {
            // re-throw known errors as-is, wrap unknown DB errors
            if (error instanceof Error) throw error;
            throw new Error("Login failed");
        }
    }

    async createUser(username: string, email: string, password: string) {
        try {
            const { user, token } = await prisma.$transaction(async (tx) => {
                const existingUser = await tx.user.findUnique({ where: { email } });
                if (existingUser) {
                    throw new Error("User already exists");
                }

                const hash = await bcrypt.hash(password, 10);
                console.log("Hashed password:", hash);

                const user = await tx.user.create({
                    data: { username, email, passwordHash: hash },
                });

                console.log("Created user:", user);

                const token = this.sign({ id: user.id, email: user.email });
                console.log("Generated token:", token);
                return { user, token };
            });

            return { token };

        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error("Registration failed");
        }
    }
}

export default new UserService();
