const {Pool} = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://knxusxqcxxnkux:54d42e8dc0d68d03f28231ba2e80ce2ca25f1b8946983908e0368728fbe40f78@ec2-54-163-34-107.compute-1.amazonaws.com:5432/d3r07hslap6jl4",
  ssl: {rejectUnauthorized: false},
});

module.exports = {
  pool,
};
