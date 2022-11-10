const crypto = require("crypto-js");
const {pool_query, pool_query_unique, pool_query_insert, pool_query_update, message_success, message_failure, validar_llaves, filtrar_llaves} = require("../functions/servicios");
const CryptoJS = require("crypto-js");

const consultar_roles = async (request, response) => {
  //Consulta query
  const {token_acceso} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query(`SELECT * FROM rol;`, "Roles consultados exitosamente", "Error, no se pudieron consultar los roles");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const validar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "contrasena"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {usuario, contrasena} = request.body;

  const query = await pool_query_unique(`Select * From usuario Where usuario = '${usuario}' AND PGP_SYM_DECRYPT(contrasena::bytea, 'AES_KEY') = '${contrasena}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo validar el usuario");

  if (!query.response) {
    return response.status(200).json(message_failure("Usuario o contraseña no encontrados"));
  } else if (query.success) {
    request.session.login = true;
    request.session.id_usuario = query.response.id_usuario;
    request.session.rol_id = query.response.rol_id;
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

const consultar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query_unique(`Select * From usuario Where id_usuario = '${id_usuario}' And activo = true`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const consultar_usuarios = async (request, response) => {
  //Consulta query
  const {token_acceso} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query(`SELECT * FROM usuario WHERE activo = true;`, "Usuarios consultados exitosamente", "Error, no se pudieron consultar los usuarios");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const agregar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "correo", "contrasena", "nombre", "apellido_paterno", "apellido_materno", "rol_id"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, usuario, correo} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT usuario, correo FROM usuario WHERE usuario = '${usuario}' OR correo = '${correo}';`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.usuario === usuario) return response.status(200).json(message_failure("Usuario no valido"))
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no valido"));
    }

    const query = await pool_query(pool_query_insert(request.body, true, "usuario"), "Usuario agregado exitosamente", "Error, no se pudo agregar el usuario");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const eliminar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));
  //Consulta query
  const {token_acceso, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query(`Update usuario Set activo = 'false' Where id_usuario = '${id_usuario}';`, "Usuario eliminado exitosamente", "Error, no se pudo eliminar el usuario");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const editar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, correo, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT correo FROM usuario WHERE  correo = '${correo}';`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no valido"));
    }

    const where = {id_usuario: id_usuario};
    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, ["correo", "telefono", "rol_id"]), where, "usuario"), "Usuario exitosamente", "Error, no se pudo editar el usuario");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

module.exports = {
  validar_usuario,
  consultar_usuarios,
  consultar_roles,
  agregar_usuario,
  eliminar_usuario,
  consultar_usuario,
  editar_usuario
};
