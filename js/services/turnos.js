const { pool_query } = require("../functions/servicios");

const consultar_turnos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_turnos,
};
