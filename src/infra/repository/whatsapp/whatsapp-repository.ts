import WhatsAppEntity from "@entity/whatsapp/whatsapp.entity";
import WhatsAppRepository from "@repository/whatsapp/whatsapp-repository";
import axios, { AxiosRequestConfig } from "axios";

export default class WhatsAppRepositoryCall implements WhatsAppRepository {
    private readonly apiVersion = process.env.META_WA_API_VERSION || 'v13.0';
    private readonly accessToken = process.env.META_WA_ACCESS_TOKEN;
    private readonly senderPhoneNumberId = process.env.META_WA_SENDER_PHONE_NUMBER_ID || '108661195265536';

    async postMainMessageWhatsAppApi(name: string, phoneNumber: string): Promise<unknown> {
        return this.createWhatsAppEntity(name, phoneNumber).sendMainWhatAppMessage();
    }

    async postFirstButtonResponseWhatsAppApi(name: string, phoneNumber: string): Promise<unknown> {
        return this.createWhatsAppEntity(name, phoneNumber).searchOrderAndSendMessage();
    }

    private createWhatsAppEntity(name: string, phoneNumber: string): WhatsAppEntity {
        return new WhatsAppEntity(
            this.messagesUrl,
            this.requestOptions,
            axios,
            { name, phoneNumber },
        );
    }

    private get messagesUrl(): string {
        return `https://graph.facebook.com/${this.apiVersion}/${this.senderPhoneNumberId}/messages`;
    }

    private get requestOptions(): AxiosRequestConfig {
        if (!this.accessToken) {
            throw new Error('META_WA_ACCESS_TOKEN não configurado.');
        }

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
    }
}
