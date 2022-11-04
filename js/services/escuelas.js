const { pool } = require("../database/pg");

const consultar_escuelas = async (req, res) => {
  const result = await pool.query("Select * From escuela;");
  res.send({
    message: result.rows,
  });
};

module.exports = {
  consultar_escuelas,
};
