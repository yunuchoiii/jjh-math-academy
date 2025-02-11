require('dotenv').config();

module.exports = {
  "development": {
    username: "root",
    password: "1234",
    database: "jjh_math_academy",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  "production": {
    username: process.env.AWS_DB_USERNAME,
    password: process.env.AWS_DB_PASSWORD,
    database: process.env.AWS_DB_NAME,
    host: process.env.AWS_DB_ENDPOINT,
    dialect: 'mysql'
  }
}; 