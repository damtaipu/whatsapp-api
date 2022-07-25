import { NextFunction, Request, Response } from "express";

export default class ExpressAdapter {
	static create (fn, io?) {
		return async function (req: Request, res: Response, next: NextFunction) {
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");

			const obj = await fn(req.params, req.body, res, io);
			return obj
		}
	}
}