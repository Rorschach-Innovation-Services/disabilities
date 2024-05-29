/**
 * Default/Development Configuration Variables
 */

const defaultConfig = {
    port: process.env.PORT,
    database: process.env.DATABASE_URL,
    tokenSecret: process.env.TOKEN_SECRET || "eyJhbGciOiJIUzM4NCJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNTcwODQyNCwiaWF0IjoxNjM1NzA4NDI0fQ.xPti8qMf_eGGkdrKBFi2WPqhGrZCoWeOL1hzABJ7V0FexbH3lNlFHzi71Bh6umr3"
}

export default defaultConfig;