const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'prod',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: '3000',
    Meta_WA_accessToken:'EAAuFNnTgCRYBAPtavD7Jei1RFBj91knmZBoJQzCcJpO0fOapsr6f4Le01Cwjoh0iJKTRSqlPgoMJ5gUcGm84Xn35Q8nJ6qkAmX3mkn7zJ1ZBShtr0zYv3gcHUUdTTi33BTdRYq8zxIfvSFddUNQ2YeEfPFslbFS9x9Qr3YUFWLw60GZAPFZB2ixib12lJrObeBk9qb1QTgZDZD',
    Meta_WA_SenderPhoneNumberId: '108661195265536',
    Meta_WA_wabaId: '103513655789849',
    Meta_WA_VerifyToken: 'MeuTokenWhatssTests2022'
};

const fallback = {
    ...process.env,
    NODE_ENV: undefined,
};

export const setUpEnvironment = (environment): any => {
    console.log(`Execution environment selected is: "${environment}"`);
    if (environment === 'prod') {
        return production;
    } else if (environment === 'dev') {
        return development;
    } else {
        return fallback;
    }
};