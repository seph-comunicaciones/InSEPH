const {pool_query} = require("../functions/servicios");

const consultar_niveles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From nivel;", "Niveles educativos consultados exitosamente", "Error, no se pudieron consultar los niveles educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_servicios = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From servicio_educativo;", "Servicios educativos consultados exitosamente", "Error, no se pudieron consultar los servicios educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_tipos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From tipo;", "Tipos educativos consultados exitosamente", "Error, no se pudieron consultar los tipos educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_municipios = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From municipio;", "Municipios consultados exitosamente", "Error, no se pudieron consultar los municipios");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_turnos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_modelos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From modelo;", "Modelos de educación consultados exitosamente", "Error, no se pudieron consultar los modelos de educación");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimientos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sostenimiento;", "Sostenimientos educativos consultados exitosamente", "Error, no se pudieron consultar los sostenimientos educativo");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_controles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_control;", "Controles consultados exitosamente", "Error, no se pudieron consultar los controles");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

module.exports = {
  consultar_niveles,
  consultar_servicios,
  consultar_tipos,
  consultar_municipios,
  consultar_turnos,
  consultar_modelos,
  consultar_sostenimientos,
  consultar_controles
}