import { Request, Response } from "express"
import { UserType } from "../types/user.interface";
import { createUserService } from "../services/user.services";
import bcrypt from "bcryptjs";
import { UserDomain } from "../entities/user.class";

export async function postNewUser(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, password } = req.body;
        console.log("🚀 ~ postNewUser ~ req.body:", req.body)
        if (!email || !name || !password) {
            res.status(400).json({ error: "Name, email and password are required" });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDomain = new UserDomain(
            "",
            name,
            email,
            hashedPassword,
            false,
            []
        );


        const newUser: UserType = await createUserService(userDomain);

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
        } else {
            console.error("Unexpected error creating user:", error);
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
}