import { Request, Response } from "express"
import { UserType } from "../types/user.interface";
import { createUserService } from "../services/user.services";


export async function postNewUser(req: Request, res: Response): Promise<void> {
    try {
        const { name, email } = req.body;
        if (!email || !name) {
            res.status(400).json({ error: "Name and email are required" });
            return
        }

        const newUser: UserType = await createUserService(req.body);

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