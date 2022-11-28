const {Pool} = require("pg");

const {USER_DB, PASSWORD_DB, HOST_DB, PORT_DB, DB} = process.env

const pool = new Pool({
  connectionString: `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DB}`,
  ssl: {rejectUnauthorized: false},
});

module.exports = {
  pool,
};
