import WhatsAppEntity from "@entity/whatsapp/whatsapp.entity";
import WhatsAppRepository from "@repository/whatsapp/whatsapp-repository";
import axios from "axios";

export default class WhatsAppRepositoryCall implements WhatsAppRepository {
    private TOKEN = 'EAAT8mjKNYPIBAFVdrGjuOPMYUUMoYp7J1v0ZAjYusFgdLnOq6xCMtcyMFtKVm3dPESTZBZC9X50X25faprZCIEZA123YBy7U7BbEB6e9RHEo9O3Kvv2aNZC2YCg77ZCtt1iPuseEb9PumJZBplDAms7x5b144Y5piAmIxsU5crAsk9LEloNCdwGAdKusZC6C9N71RN9lKqDfyrQa8YOnTbgHGCnyLpgwJBGQZD';

    async getWhatsAppApi(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async postMainMessageWhatsAppApi(name: string, phoneNumber: string): Promise<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.TOKEN}`
            }
        };

        const callWhatsAppApi = new WhatsAppEntity('https://graph.facebook.com/v13.0/108661195265536/messages', options, axios, name, phoneNumber);
        return await callWhatsAppApi.sendMainWhatAppMessage();
    }

    async postFirstButtonResponseWhatsAppApi(name: string, phoneNumber: string): Promise<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.TOKEN}`
            }
        };

        const callWhatsAppApi = new WhatsAppEntity('https://graph.facebook.com/v13.0/108661195265536/messages', options, axios, name, phoneNumber);
        return await callWhatsAppApi.searchOrderAndSendMessage();
    }
} 