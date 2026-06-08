import { BaseData } from "@entity/baseData/base-data.entity";
import { Request, Response } from "express";

export default class RouteBaseBlock {
    static blockUrlBase(_req: Request, res: Response) {
        return BaseData.sendResponse(403, 'Url base com acesso restrito', [], res);
    }
}
