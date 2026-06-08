import WhatsAppRepository from "@repository/whatsapp/whatsapp-repository";

export default class WhatsAppFirstButtonUseCase {
    constructor(private readonly whatsAppRepository: WhatsAppRepository) {}

    execute(name: string, phoneNumber: string) {
        return this.whatsAppRepository.postFirstButtonResponseWhatsAppApi(name, phoneNumber);
    }
}
