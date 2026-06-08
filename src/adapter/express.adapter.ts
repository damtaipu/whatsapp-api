import { NextFunction, Request, Response } from "express";
import { Server as SocketServer } from "socket.io";

type ControllerHandler = (req: Request, res: Response, io?: SocketServer) => unknown | Promise<unknown>;

export default class ExpressAdapter {
    static create(fn: ControllerHandler, io?: SocketServer) {
        return async function (req: Request, res: Response, next: NextFunction) {
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");

            try {
                return await fn(req, res, io);
            } catch (error) {
                return next(error);
            }
        };
    }
}
