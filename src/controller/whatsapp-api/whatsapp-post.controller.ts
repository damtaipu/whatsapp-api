import WhatsAppRepositoryCall from "@infra/repository/whatsapp/whatsapp-repository";
import WhatsAppUseCase from "@usecase/whatsapp/whatsapp.usecase";
import Util from "@entity/Util/util.commons"
import WhatsAppFirstButtonUseCase from "@usecase/whatsapp/whatsapp-firstbutton-response.usecase copy";

export default class WhatsAppPostController {

    static async metaWhatsPostAppCallBack(req, res, io?) {
        console.log(req.body.entry[0].changes);
        console.log(req.body.entry[0].changes[0].value);
    
        // Montar constante de acordo a mensagem enviada pelo usuário;
        let contact;
        let message;
        let contactName;
        let contactPhoneNumber;

        const typeMessage = req.body.entry[0].changes[0].value.hasOwnProperty('messages') ? req.body.entry[0].changes[0].value.messages[0].type : null;

        if (typeMessage === 'text') {
            contact = req.body.entry[0].changes[0].value;
            contactName = req.body.entry[0].changes[0].value.contacts[0].profile.name;
            contactPhoneNumber = req.body.entry[0].changes[0].value.contacts[0].wa_id
            message = req.body.entry[0].changes[0].value.messages[0].text.body;
            //console.log(contact, contactPhoneNumber)
        }

        if (contact && typeMessage === 'text') {

            const whatsAppCallApi = new WhatsAppRepositoryCall();
            const whatsUseCase = new WhatsAppUseCase(whatsAppCallApi);
            const sendWhats = whatsUseCase.execute(contactName, Util.includeNineDigit(contactPhoneNumber));

            let rtn = await sendWhats;
            // console.log(rtn)
        }

        if (typeMessage === 'interactive') {
            contact = req.body.entry[0].changes[0].value;
            contactName = req.body.entry[0].changes[0].value.contacts[0].profile.name;
            contactPhoneNumber = req.body.entry[0].changes[0].value.contacts[0].wa_id

            const buttonId = req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id;
            buttonId === 'primeiro-botao-id' ? WhatsAppPostController.firstButtonSelected(buttonId, res, contactName, contactPhoneNumber) : WhatsAppPostController.secondButtonSelected(buttonId);
             
        }

        return res.status(200).send();
    }

    static async firstButtonSelected(btnId: string, res, contactName, contactPhoneNumber) {
        const whatsAppCallApi = new WhatsAppRepositoryCall();
        const whatsUseCase = new WhatsAppFirstButtonUseCase(whatsAppCallApi);
        const sendWhats = await whatsUseCase.execute(contactName, Util.includeNineDigit(contactPhoneNumber));
        res.status(200).send();
    }

    static secondButtonSelected(btnId: string) {
        console.log('Aqui vai a lógica para buscar o resultado');
    }
}