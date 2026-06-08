import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface WhatsAppMessageContext {
    readonly name: string;
    readonly phoneNumber: string;
}

export default class WhatsAppEntity {
    constructor(
        private readonly url: string,
        private readonly options: AxiosRequestConfig,
        private readonly httpClient: AxiosInstance,
        private readonly context: WhatsAppMessageContext,
    ) {}

    async sendMainWhatAppMessage() {
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: this.context.phoneNumber,
            type: "interactive",
            interactive: {
                type: "button",
                header: {
                    type: "text",
                    text: `Olá ${this.context.name}!`,
                },
                body: {
                    text: "Esse é um texto de exemplo para testar a integração da API do WhatsApp com Nodejs.",
                },
                footer: {
                    text: "Aqui vai um texto de rodapé.",
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "primeiro-botao-id",
                                title: "Consultar pedido",
                            },
                        },
                        {
                            type: "reply",
                            reply: {
                                id: "segundo-botao-id",
                                title: "Consultar resultado",
                            },
                        },
                    ],
                },
            },
        };

        return this.postMessage(payload);
    }

    async searchOrderAndSendMessage() {
        const orderNumber = Math.random();
        const payload = {
            messaging_product: "whatsapp",
            to: this.context.phoneNumber,
            type: "text",
            text: {
                body: `Seu número é: ${orderNumber}`,
            },
        };

        return this.postMessage(payload);
    }

    private async postMessage(payload: unknown) {
        try {
            return await this.httpClient.post(this.url, payload, this.options);
        } catch (error: any) {
            return error?.response?.data ?? { message: "Falha ao comunicar com a API do WhatsApp" };
        }
    }
}
