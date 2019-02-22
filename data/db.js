const knexConfig = require("./knexfile");
const knex = require("knex");

knexConfig.development.connection.filename = "./data/dev.sqlite3";

const db = knex(knexConfig.development);

module.exports = db;
