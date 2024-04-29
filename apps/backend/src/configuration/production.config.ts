/**
 * Production Configuration Variables
 */

const productionConfig = {
    port: process.env.PORT_PRODUCTION,
    database: process.env.DATABASE_URL_PRODUCTION,
    tokenSecret: process.env.TOKEN_SECRET_PRODUCTION
}

export default productionConfig;