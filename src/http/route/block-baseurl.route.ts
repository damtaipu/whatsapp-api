import { BaseData } from "@entity/baseData/base-data.entity";

export default class RouteBaseBlock {
        static blockUrlBase(params, body, res) {
                return new BaseData(403, 'Url base com acesso restrito', []).sendResponse(res);
        }
}