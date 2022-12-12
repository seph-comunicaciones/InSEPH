const {validate_session, pool_query, message_failure, validar_llaves, pool_query_unique} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_avisos = async (request, response) => {
  const {informacion, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.login || (token_acceso === TOKEN_WEB || token_acceso === TOKEN_MOVIL)) {
    const query = await pool_query(`${!informacion ? `SELECT uuid, id_aviso, titulo, sub_titulo FROM aviso order by id_aviso DESC;` : `SELECT * FROM aviso order by id_aviso DESC;`}`, "Avisos consultados exitosamente", "Error, no se pudieron consultar los avisos");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_aviso = async (request, response) => {
  const {id_aviso, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_aviso"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.login || (token_acceso === TOKEN_WEB || token_acceso === TOKEN_MOVIL)) {
    const query = await pool_query_unique(
      `SELECT * FROM aviso WHERE id_aviso = ${id_aviso};`,
      "Aviso consultado exitosamente",
      "Error, no se pudo consultar el Aviso"
    );

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

module.exports = {
  consultar_avisos,
  consultar_aviso
}