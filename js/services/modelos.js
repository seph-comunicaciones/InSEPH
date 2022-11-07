const { pool_query } = require("../functions/servicios");

const consultar_modelos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From modelo;", "Modelos de educación consultados existosamente", "Error, no se pudieron consultar los modelos de educación");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_modelos,
};
