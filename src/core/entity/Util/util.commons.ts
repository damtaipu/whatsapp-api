export default class Util {
    static includeNineDigit(phoneNumber) {
        const phone = phoneNumber;
        let codeCountry = phone.slice(0, 2);
        let ddd = phone.slice(2, 4);
        return phone.slice(4).length !== 9 ? codeCountry + ddd + '9' + phone.slice(4) : codeCountry + ddd + phone.slice(4);
    }
}