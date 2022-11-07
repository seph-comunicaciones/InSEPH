const { pool_query } = require("../functions/servicios");

const consultar_municipios = async (request, response) => {
  //Consulta query
  const query = await pool_query(
    "Select * From municipio;",
    "Municipios consultados existosamente",
    "Error, no se pudieron consultar los municipios"
  );

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  agregar_municipio,
  consultar_municipios,
};
