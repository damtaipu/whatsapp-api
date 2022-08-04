export default interface WhatsAppRepository{
    getWhatsAppApi(): Promise<{}>;
    postMainMessageWhatsAppApi(name: string, phoneNumber: string): Promise<{}>;
    postFirstButtonResponseWhatsAppApi(name: string, phoneNumber: string): Promise<{}>;
}