import { BaseData } from "@entity/baseData/base-data.entity";

export default class RouteBaseBlock {
        static blockUrlBase(params, body, res, io?) {
                return BaseData.sendResponse(403, 'Url base com acesso restrito', [], res);
        }
}