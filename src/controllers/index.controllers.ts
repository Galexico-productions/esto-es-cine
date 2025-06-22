import { Request, Response } from 'express';

export const getHome = async (req: Request, res: Response): Promise<void> => {
    res.render('home', {
    })
}

