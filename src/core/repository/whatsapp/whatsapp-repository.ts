export default interface WhatsAppRepository {
    postMainMessageWhatsAppApi(name: string, phoneNumber: string): Promise<unknown>;
    postFirstButtonResponseWhatsAppApi(name: string, phoneNumber: string): Promise<unknown>;
}
