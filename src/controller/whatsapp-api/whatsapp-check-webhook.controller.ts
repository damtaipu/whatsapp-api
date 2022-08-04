import url from 'node:url';

export default class WhatsAppCheckWebHookController {
    static checkWebHooksWhatsApp(req, res, io?) {

        const urlDataObj: any = url.parse(req.url, true).query;
        const tk = 'myTokenTest';

        if(urlDataObj['hub.verify_token'] === tk){
            return res.status(200).send(urlDataObj['hub.challenge']);
        }        
    }
}