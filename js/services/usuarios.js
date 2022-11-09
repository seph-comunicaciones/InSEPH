const { pool_query, pool_query_unique, pool_query_insert, pool_query_update, message_success, message_failure, validar_llaves } = require("../functions/servicios");

const consultar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "contrasena"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const { usuario, contrasena } = request.body;

  const query = await pool_query_unique(`Select * From usuario Where usuario = '${usuario}' And Contrasena = '${contrasena}' And activo = true`, "Usuario consultado existosamente", "Error, no se pudo consultar el usuario");

  if (!query.response) {
    return response.status(200).json(message_failure("Usuario o contraseña no encontrados"));
  } else if (query.success) {
    request.session.login = true;
    request.session.id_usuario = query.response.id_usuario;
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_usuario,
};
