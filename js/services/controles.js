const { pool_query } = require("../functions/servicios");

const consultar_controles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From control;", "Controles consultados exitosamente", "Error, no se pudieron consultar los controles");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_controles,
};
