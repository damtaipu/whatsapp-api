import { Request, Response } from "express";

export default class WhatsAppCheckWebHookController {
    static checkWebHooksWhatsApp(req: Request, res: Response) {
        const verifyToken = process.env.META_WA_VERIFY_TOKEN || 'myTokenTest';
        const receivedToken = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (receivedToken === verifyToken) {
            return res.status(200).send(challenge);
        }

        return res.status(403).send('Token de verificação inválido.');
    }
}
