

export default class WhatsAppEntity {
    private url: string;
    private options: {};
    private name;
    private phoneNumber
    private axios;

    constructor(url: string, option: {}, axios, name?: string, phoneNumber?: string) {
        this.url = url;
        this.options = option;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.axios = axios;
    }

    async sendMainWhatAppMessage() {
        const payload = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": this.phoneNumber,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "text",
                    "text": `Olá ${this.name}!`
                },
                "body": {
                    "text": "Esse é um texto de exemplo para testar a integração da API do WhatsApp com Nodejs."
                },
                "footer": {
                    "text": "Aqui vai um exto de rodapé."
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "primeiro-botao-id",
                                "title": "Consultar pedido"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "segundo-botao-id",
                                "title": "Consultar resultado"
                            }
                        }
                    ]
                }
            }
        });

        try {
            return await this.axios.post(this.url, payload, this.options);
        } catch (error) {
            return await error.response.data;
        }
    }

    async searchOrderAndSendMessage() {
        let number = Math.random();
        const payload = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": this.phoneNumber,
            "type": "text",
            "text": {
                "body": `Seu número é: ${number}`
            }
        });


        try {
            return await this.axios.post(this.url, payload, this.options);
        } catch (error) {
            return await error.response.data;
        }
    }
}