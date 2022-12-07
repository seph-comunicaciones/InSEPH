const {validate_session, pool_query, message_failure} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_avisos = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.login || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT * FROM aviso order by id_avisos DESC;`, "Avisos consultados exitosamente", "Error, no se pudieron consultar los avisos");

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
  consultar_avisos
}