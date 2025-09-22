import { Request, Response } from "express"
import { DBUserType } from "../types/user.interface";
import { createUserService } from "../services/user.services";
import bcrypt from "bcryptjs";
import session from "../types/express-session";
import { UserDomain } from "../entities/user.class";
import { getUserByUserName } from "../repositories/user.repository";

export async function postNewUser(req: Request, res: Response): Promise<void> {
    try {
        const { userName, email, password } = req.body;
        if (!email || !userName || !password) {
            res.status(400).json({ error: "Username, email and password are required" });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDomain = new UserDomain(
            "",
            userName,
            email,
            hashedPassword,
            false,
            []
        );

        const newUser: DBUserType = await createUserService(userDomain);

        req.session.userId = newUser.id;
        req.session.userName = newUser.userName;

        res.status(201).json({
            message: "User created successfully",
            userName: newUser,
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
        const { userName, password } = req.body;
        console.log("🚀 ~ postLogin ~ req.body:", req.body)

        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }

        const user = await getUserByUserName(userName);
        console.log("🚀 ~ postLogin ~ user:", user)
        if (!user) {
            res.status(400).json({ error: "Invalid credentials " });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials " });
            return;
        }

        req.session.userId = user.id;
        req.session.userName = user.userName;

        res.status(200).json({
            message: "Logged in successfully",
            user: { id: user.id, userName: user.userName, email: user.email }
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