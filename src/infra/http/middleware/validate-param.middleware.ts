import { BaseData } from '@entity/baseData/base-data.entity';
import { NextFunction, Request, Response } from 'express';

export default class VerifyParamMiddleware {
    static checkParam(req: Request, res: Response, next: NextFunction) {
        if (Number.isNaN(Number(req.params.id))) {
            return BaseData.sendResponse(400, 'Parâmetro id deve ser numérico', [], res);
        }

        return next();
    }
}
