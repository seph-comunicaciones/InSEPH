const { pool } = require("../database/pg");

const consultar_escuelas = async (req, res) => {
  const result = await pool.query("Select * From escuela;");
  res.send({
    message: result.rows,
    sucess: true,
    failure: false,
  });
  res.sendStatus(200);
};

module.exports = {
  consultar_escuelas,
};
