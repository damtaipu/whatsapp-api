import RtnBaseData from "@domain/baseData/base-data.model";
import { Response } from "express";

export class BaseData {
    static sendResponse<T>(code: number, message: string, data: T, res: Response) {
        const payload: RtnBaseData<T> = {
            code,
            message,
            data,
        };

        return res.status(code).send(payload);
    }
}
