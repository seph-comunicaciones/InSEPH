const {validar_llaves, message_failure, pool_query_unique, pool_query, pool_query_update, filtrar_llaves, validate_session, pool_query_insert, message_success} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const validar_usuario = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "contrasena"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {usuario, contrasena} = request.body;

  const query = await pool_query_unique(`Select *
                                         From usuario
                                         Where usuario = '${usuario}'
                                           AND PGP_SYM_DECRYPT(contrasena::bytea, 'AES_KEY') = '${contrasena}'
                                           And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo validar el usuario");

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
}

const consultar_usuarios = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT usuario, nombre, apellido_materno, apellido_paterno, id_usuario
                                    FROM usuario
                                    WHERE activo = true;`, "Usuarios consultados exitosamente", "Error, no se pudieron consultar los usuarios");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_usuario = async (request, response) => {
  const {token_acceso, id_usuario} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query = await pool_query_unique(`SELECT usuario,
                                                  correo,
                                                  nombre,
                                                  apellido_materno,
                                                  apellido_paterno,
                                                  telefono,
                                                  rol_id,
                                                  id_usuario,
                                                  usuario_id_modificacion,
                                                  hora_modificacion, LEFT (cast (fecha_modificacion AS varchar), 10) AS fecha_modificacion
                                           FROM usuario
                                           WHERE id_usuario = '${id_usuario}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");

    if (query.success) {
      const query_us_mod = await pool_query_unique(`SELECT nombre, apellido_materno, apellido_paterno
                                                    FROM usuario
                                                    WHERE id_usuario = '${query.response.usuario_id_modificacion}'
                                                      And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");

      if (query_us_mod.success) {
        query.response["usuario_nombre_modificacion"] = query_us_mod.response.nombre
        query.response["usuario_apellido_paterno_modificacion"] = query_us_mod.response.apellido_paterno
        query.response["usuario_apellido_materno_modificacion"] = query_us_mod.response.apellido_materno
        return response.status(200).json(query);
      } else {
        return response.status(400).json(query);
      }
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_rol_usuario = async (request, response) => {
  const {token_acceso, id_usuario} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.login || id_usuario || token_acceso === TOKEN_WEB) {
    const query = await pool_query_unique(`SELECT rol_id, id_usuario
                                           FROM usuario
                                           WHERE id_usuario = '${request.session.login ? request.session.id_usuario : id_usuario}'
                                             And activo = true;`, "Rol consultado exitosamente", "Error, no se pudo consultar el rol");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_roles = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT *
                                    FROM rol;`, "Roles consultados exitosamente", "Error, no se pudieron consultar los roles");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const agregar_usuario = async (request, response, socket) => {
  const {token_acceso, usuario, correo} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "correo", "contrasena", "nombre", "apellido_paterno", "apellido_materno", "rol_id"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT usuario, correo
                                                FROM usuario
                                                WHERE usuario = '${usuario}'
                                                   OR correo = '${correo}';`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.usuario === usuario) return response.status(200).json(message_failure("Usuario no disponible"))
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no disponible"));
    }

    const llaves_filtrar = ["usuario", "correo", "contrasena", "nombre", "apellido_paterno", "apellido_materno", "rol_id", "telefono", "usuario_id_modificacion"];

    const query = await pool_query(pool_query_insert(await filtrar_llaves(request.body, llaves_filtrar), true, "usuario"), "Usuario agregado exitosamente", "Error, no se pudo agregar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, nombre, apellido_materno, apellido_paterno, id_usuario
                                                    FROM usuario
                                                    WHERE usuario = '${usuario}'
                                                      And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("agregar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const eliminar_usuario = async (request, response, socket) => {
  const {token_acceso, id_usuario} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    request.body["activo"] = false
    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, ["activo", "usuario_id_modificacion"]), {id_usuario: id_usuario}, "usuario"), "Usuario eliminado exitosamente", "Error, no se pudo eliminar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, id_usuario
                                                    FROM usuario
                                                    WHERE id_usuario = '${id_usuario}';`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("eliminar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const editar_usuario = async (request, response, socket) => {
  const {token_acceso, correo, id_usuario} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT correo
                                                FROM usuario
                                                WHERE correo = '${correo}'
                                                  AND id_usuario != ${id_usuario}
                                                  AND activo = true;`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no valido"));
    }

    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, ["correo", "telefono", "rol_id", "usuario_id_modificacion"]), {id_usuario: id_usuario}, "usuario"), "Usuario actualizado exitosamente", "Error, no se pudo editar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, nombre, apellido_materno, apellido_paterno, id_usuario
                                                    FROM usuario
                                                    WHERE id_usuario = '${id_usuario}'
                                                      And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("editar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const validacion_session = async (request, response, socket) => {
  const validacion_session = await validate_session(request, response, null)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  return response.status(200).json(message_success("", {}));
}

module.exports = {
  editar_usuario,
  validar_usuario,
  consultar_usuario,
  consultar_usuarios,
  consultar_rol_usuario,
  consultar_roles,
  agregar_usuario,
  eliminar_usuario,
  validacion_session
}