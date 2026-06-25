const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
    }
});

module.exports = sequelize;