const { pool_query } = require("../functions/servicios");

const consultar_niveles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From nivel;", "Niveles educativos consultados existosamente", "Error, no se pudieron consultar los niveles educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

const consultar_tipos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From tipo;", "Tipos educativos consultados existosamente", "Error, no se pudieron consultar los tipos educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

const consultar_servicios = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From servicio_educativo;", "Servicios educativos consultados existosamente", "Error, no se pudieron consultar los servicios educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_niveles,
  consultar_tipos,
  consultar_servicios,
};
