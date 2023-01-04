const {pool_query} = require("./servicios");

const consultar_municipios = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From municipio;", "Municipios consultados exitosamente", "Error, no se pudieron consultar los municipios");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_marcas = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From marca;", "Marcas consultadas exitosamente", "Error, no se pudieron consultar las marcas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_estatus = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From status;", "Estatus educativos consultados exitosamente", "Error, no se pudieron consultar los status");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_turnos_1 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno1;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_turnos_2 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno2;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_turnos_3 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno3;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_niveles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From nivel;", "Niveles consultados exitosamente", "Error, no se pudieron consultar los niveles");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_tipos = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From tipo;", "Tipos consultados exitosamente", "Error, no se pudieron consultar los tipos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_directores = async (request, response) => {
  //Consulta query
  const query = await pool_query("SELECT * FROM director WHERE nombre_director != 'NO ESPECIFICADO';", "Directores consultados exitosamente", "Error, no se pudieron consultar los directores");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_inmuebles = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From inmueble;", "Inmuebles consultados exitosamente", "Error, no se pudieron consultar los inmuebles");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_postal = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From codigo_postal;", "Códigos postales consultados exitosamente", "Error, no se pudieron consultar los códigos postales");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_region = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From region;", "Regiones consultados exitosamente", "Error, no se pudieron consultar las regiones");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_control = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_control;", "Sostenimientos de control consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de control");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_sub_control = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_subcontrol;", "Sub-sostenimientos de control consultados exitosamente", "Error, no se pudieron consultar los sub-sostenimientos de control");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_dependencia_1 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_dependencia1;", "Sostenimientos de dependencias consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de dependencias");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_dependencia_2 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_dependencia2;", "Sostenimientos de dependencias consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de dependencias");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_dependencia_3 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_dependencia3;", "Sostenimientos de dependencias consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de dependencias");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_dependencia_4 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_dependencia4;", "Sostenimientos de dependencias consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de dependencias");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_sostenimiento_servicio = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_servicio;", "Sostenimientos de servicio consultados exitosamente", "Error, no se pudieron consultar los sostenimientos de servicio");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_dependencia_operativa_1 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From dep_operativa1;", "Dependencias operativas consultadas exitosamente", "Error, no se pudieron consultar las dependencias operativas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_dependencia_operativa_2 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From dep_operativa2;", "Dependencias operativas consultadas exitosamente", "Error, no se pudieron consultar las dependencias operativas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_dependencia_operativa_3 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From dep_operativa3;", "Dependencias operativas consultadas exitosamente", "Error, no se pudieron consultar las dependencias operativas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_dependencia_operativa_4 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From dep_operativa4;", "Dependencias operativas consultadas exitosamente", "Error, no se pudieron consultar las dependencias operativas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_dependencia_operativa_5 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From dep_operativa5;", "Dependencias operativas consultadas exitosamente", "Error, no se pudieron consultar las dependencias operativas");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_servicio_educativo = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From servicio_educativo;", "Servicios educativos consultados exitosamente", "Error, no se pudieron consultar los servicios educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_servicio_cam = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From cam_servicio;", "Servicios CAM consultados exitosamente", "Error, no se pudieron consultar los servicios CAM");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_caracteristica_1 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From caracteristica1;", "Características consultadas exitosamente", "Error, no se pudieron consultar las características");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

const consultar_caracteristica_2 = async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From caracteristica2;", "Características consultadas exitosamente", "Error, no se pudieron consultar las características");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
}

module.exports = {
  consultar_municipios,
  consultar_marcas,
  consultar_estatus,
  consultar_turnos_1,
  consultar_turnos_2,
  consultar_turnos_3,
  consultar_niveles,
  consultar_tipos,
  consultar_directores,
  consultar_inmuebles,
  consultar_postal,
  consultar_region,
  consultar_sostenimiento_control,
  consultar_sostenimiento_sub_control,
  consultar_sostenimiento_dependencia_1,
  consultar_sostenimiento_dependencia_2,
  consultar_sostenimiento_dependencia_3,
  consultar_sostenimiento_dependencia_4,
  consultar_sostenimiento_servicio,
  consultar_dependencia_operativa_1,
  consultar_dependencia_operativa_2,
  consultar_dependencia_operativa_3,
  consultar_dependencia_operativa_4,
  consultar_dependencia_operativa_5,
  consultar_servicio_educativo,
  consultar_servicio_cam,
  consultar_caracteristica_1,
  consultar_caracteristica_2,
}