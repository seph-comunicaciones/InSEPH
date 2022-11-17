const {Pool} = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:HweyYZPAARqECOuuPlj6@containers-us-west-115.railway.app:7703/railway",
  ssl: {rejectUnauthorized: false},
});

module.exports = {
  pool,
};
