import { NextFunction, Request, Response } from "express";
import { ErrorExtension } from "../utils/ErrorExtension";

export const httpErrorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    const { status, message } = err as ErrorExtension;

    res.status(status || 500).json({ message })
}