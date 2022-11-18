const {Pool} = require("pg");

const user = "postgres"
const password = "HweyYZPAARqECOuuPlj6"
const host = "containers-us-west-115.railway.app"
const port = "7703"
const database = "sig_dev"

const pool = new Pool({
  connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
  ssl: {rejectUnauthorized: false},
});

module.exports = {
  pool,
};
