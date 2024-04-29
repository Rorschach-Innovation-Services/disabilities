/**
 * Testing Configuration Variables
 */

const testingConfig = {
    port: process.env.PORT_TEST,
    database: process.env.DATABASE_URL_TEST,
    tokenSecret: process.env.TOKEN_SECRET_TEST
}

export default testingConfig;