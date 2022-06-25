import rtnBaseData from "@domain/baseData/base-data.model";

export class BaseData {
    private code: number;
    private message: string;
    private data: {};
    
    constructor(code: number, message: string, data: {}) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public sendResponse(res){
        let dta: rtnBaseData = {
            code: this.code,
            message: this.message,
            data: this.data
        };

        return this.code === 200 ? res.send(dta) : res.status(this.code).send(dta);
    }

}