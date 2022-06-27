import { BaseData } from '@entity/baseData/base-data.entity';
import express from 'express';

export default class VerifyParamMiddleware {
    static checkParam(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (isNaN(Number(req.params.id))) return BaseData.sendResponse(500, 'String nao permitido', [], res);
        next();
    }
}