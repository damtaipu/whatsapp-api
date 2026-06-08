export default class Util {
    static includeNineDigit(phoneNumber: string): string {
        const countryCode = phoneNumber.slice(0, 2);
        const areaCode = phoneNumber.slice(2, 4);
        const subscriberNumber = phoneNumber.slice(4);

        return subscriberNumber.length !== 9
            ? `${countryCode}${areaCode}9${subscriberNumber}`
            : `${countryCode}${areaCode}${subscriberNumber}`;
    }
}
