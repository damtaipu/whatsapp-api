import WhatsAppRepositoryCall from "@infra/repository/whatsapp/whatsapp-repository";
import WhatsAppUseCase from "@usecase/whatsapp/whatsapp.usecase";
import Util from "@entity/Util/util.commons";
import WhatsAppFirstButtonUseCase from "@usecase/whatsapp/whatsapp-first-button-response.usecase";
import { Request, Response } from "express";

type WhatsAppMessageType = 'text' | 'interactive';

interface WhatsAppContactData {
    readonly contactName: string;
    readonly contactPhoneNumber: string;
}

export default class WhatsAppPostController {
    static async metaWhatsPostAppCallBack(req: Request, res: Response) {
        const value = req.body?.entry?.[0]?.changes?.[0]?.value;
        const typeMessage = value?.messages?.[0]?.type as WhatsAppMessageType | undefined;

        if (!value || !typeMessage) {
            return res.status(200).send();
        }

        const contactData = WhatsAppPostController.extractContactData(value);

        if (!contactData.contactPhoneNumber) {
            console.warn('Webhook do WhatsApp sem telefone do contato.');
            return res.status(200).send();
        }

        if (typeMessage === 'text') {
            await WhatsAppPostController.sendMainMessage(contactData);
            return res.status(200).send();
        }

        if (typeMessage === 'interactive') {
            const buttonId = value.messages?.[0]?.interactive?.button_reply?.id;

            if (buttonId === 'primeiro-botao-id') {
                await WhatsAppPostController.firstButtonSelected(contactData);
            } else {
                WhatsAppPostController.secondButtonSelected(buttonId);
            }
        }

        return res.status(200).send();
    }

    private static extractContactData(value: any): WhatsAppContactData {
        return {
            contactName: value.contacts?.[0]?.profile?.name ?? 'Cliente',
            contactPhoneNumber: value.contacts?.[0]?.wa_id ?? '',
        };
    }

    private static async sendMainMessage(contactData: WhatsAppContactData) {
        const whatsAppCallApi = new WhatsAppRepositoryCall();
        const whatsUseCase = new WhatsAppUseCase(whatsAppCallApi);

        return whatsUseCase.execute(
            contactData.contactName,
            Util.includeNineDigit(contactData.contactPhoneNumber),
        );
    }

    static async firstButtonSelected(contactData: WhatsAppContactData) {
        const whatsAppCallApi = new WhatsAppRepositoryCall();
        const whatsUseCase = new WhatsAppFirstButtonUseCase(whatsAppCallApi);

        return whatsUseCase.execute(
            contactData.contactName,
            Util.includeNineDigit(contactData.contactPhoneNumber),
        );
    }

    static secondButtonSelected(btnId?: string) {
        console.log(`Botão selecionado sem implementação: ${btnId ?? 'desconhecido'}`);
    }
}
