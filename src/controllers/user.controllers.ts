import { Request, Response } from "express"
import { DBUserType } from "../types/user.interface";
import { createUserService } from "../services/user.services";
import bcrypt from "bcryptjs";
import session from "../types/express-session";
import { UserDomain } from "../entities/user.class";
import { getUserByEmail } from "../repositories/user.repository";

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

        const newUser: DBUserType = await createUserService(userDomain);

        req.session.userId = newUser.id;
        req.session.userName = newUser.name;

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
};

export async function postLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        const user = await getUserByEmail(email);
        if (!user) {
            res.status(400).json({ error: "Invalid credentials " });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalida credentials " });
            return;
        }

        req.session.userId = user.id;
        req.session.userName = user.name;

        res.status(200).json({
            message: "Logged in successfully",
            user: { id: user.id, name: user.name, email: user.email }
        })
    } catch (error: unknown) {
        console.error("Error logging in user: ", error);
        res.status(500).json({ error: "Internat Server Error" });
    }
}

export function logout(req: Request, res: Response): void {
    req.session.destroy(err => {
        if(err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/")
    });
}