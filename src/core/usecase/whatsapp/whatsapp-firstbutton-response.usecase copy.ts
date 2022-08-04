import whatsAppRepository from "@repository/whatsapp/whatsapp-repository";

export default class WhatsAppFirstButtonUseCase {
    private whatsAppRepository: whatsAppRepository;

    constructor(whatsAppRepository: whatsAppRepository) {
        this.whatsAppRepository = whatsAppRepository
    }

    execute(name: string, phoneNumber: string) {
        return this.whatsAppRepository.postFirstButtonResponseWhatsAppApi(name, phoneNumber);
    }
}