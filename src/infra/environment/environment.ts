type EnvironmentVariables = NodeJS.ProcessEnv;

const production: EnvironmentVariables = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'prod',
};

const development: EnvironmentVariables = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || '3000',
    META_WA_API_VERSION: process.env.META_WA_API_VERSION || 'v13.0',
    META_WA_SENDER_PHONE_NUMBER_ID: process.env.META_WA_SENDER_PHONE_NUMBER_ID || '108661195265536',
    META_WA_VERIFY_TOKEN: process.env.META_WA_VERIFY_TOKEN || 'myTokenTest',
};

const fallback: EnvironmentVariables = {
    ...process.env,
    NODE_ENV: undefined,
};

export const setUpEnvironment = (environment: string): EnvironmentVariables => {
    console.log(`Execution environment selected is: "${environment}"`);

    if (environment === 'prod') {
        return production;
    }

    if (environment === 'dev') {
        return development;
    }

    return fallback;
};
