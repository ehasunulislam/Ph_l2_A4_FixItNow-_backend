import { Request, Response } from "express";

export const notRouteFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        date: new Date()
    })
}