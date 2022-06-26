import rtnBaseData from "@domain/baseData/base-data.model";

export class BaseData {
    
    static sendResponse(code: number, message: string, data: {}, res){
        let dta: rtnBaseData = {
            code: code,
            message: message,
            data: data
        };

        return code === 200 ? res.send(dta) : res.status(code).send(dta);
    }
}