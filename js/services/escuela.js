const {validate_session, pool_query_unique, pool_query, message_failure, validar_llaves, pool_query_insert, filtrar_llaves, pool_query_update} = require("../functions/servicios");

const token_web = process.env.TOKEN_WEB ? process.env.TOKEN_WEB : "0012b5cc-0f3e-4c66-8fd3-24b828e359a2"
const token_movil = process.env.TOKEN_MOVIL

const consultar_escuelas = async (request, response) => {
  const {id_municipio, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_municipio"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) {
    return response.status(400).json(message_failure(validacion_llaves.message));
  }

  //Consulta query
  if (request.session.login || (token_acceso === token_web)) {
    const query = await pool_query(
      `Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
       From escuela
                Join turno On escuela.turno_id = turno.id_turno
                Join municipio On escuela.municipio_id = municipio.id_municipio ${id_municipio !== "" ? ` Where municipio.id_municipio = ${id_municipio} And escuela.activo = true ` : " Where escuela.activo = true "};`,
      "Escuelas consultadas exitosamente",
      "Error, no se pudieron consultar las escuelas"
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

const consultar_escuela = async (request, response) => {
  const {id_escuela, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.login || (token_acceso === token_web)) {
    const query = await pool_query_unique(
      `Select escuela.*, LEFT (cast (escuela.fecha_modificacion AS varchar), 10) AS fecha_modificacion, turno.nom_turno, sost_control.nom_sost_control, modelo.nom_modelo, sostenimiento.nom_sostenimiento, municipio.nom_municipio, nivel.nom_nivel, tipo.nom_tipo, servicio_educativo.nom_servicio_educativo, usuario.nombre AS usuario_nombre_modificacion, usuario.apellido_paterno AS usuario_apellido_paterno_modificacion, usuario.apellido_materno AS usuario_apellido_materno_modificacion, direccion.direccion, direccion.codigo_postal, direccion.colonia, direccion.num_int, direccion.num_ext, direccion.localidad
       From escuela
           Join turno
       On escuela.turno_id = turno.id_turno
           Join sost_control On escuela.control_id = sost_control.id_sost_control
           Join modelo On escuela.modelo_id = modelo.id_modelo
           Join sostenimiento On escuela.sostenimiento_id = sostenimiento.id_sostenimiento
           Join municipio On escuela.municipio_id = municipio.id_municipio
           Join nivel On escuela.nivel_id = nivel.id_nivel
           Join tipo On escuela.tipo_id = tipo.id_tipo
           Join servicio_educativo On escuela.servicio_educativo_id = servicio_educativo.id_servicio_educativo
           JOIN usuario on escuela.usuario_id_modificacion = usuario.id_usuario
           Left JOIN direccion on escuela.id_escuela = direccion.escuela_id
       Where escuela.id_escuela = '${id_escuela}'
         AND escuela.activo = true;`,
      "Escuela consultada exitosamente",
      "Error, no se pudo consultar la escuela"
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

const agregar_escuela = async (request, response, socket) => {
  const {token_acceso, clave} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["clave", "nombre", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "sostenimiento_id", "municipio_id", "nivel_id", "tipo_id", "servicio_educativo_id"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if ((request.session.rol_id === 1 || request.session.rol_id === 2) || (token_acceso === token_web)) {
    //Validar que no exista esta clave
    const validacion = await pool_query_unique(`SELECT clave
                                                FROM escuela
                                                where clave = '${clave}';`, "", "Error, no se pudo agregar la escuela")

    if (validacion.response && validacion.success) {
      if (validacion.response.clave === clave.toString()) {
        return response.status(200).json(message_failure("Clave no disponible"))
      }
    }

    const llaves_filtrar = ["imagen", "clave", "nombre", "pag_web", "telefono", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "tipo_id", "servicio_educativo_id", "sostenimiento_id", "municipio_id", "nivel_id", "usuario_id_modificacion"]
    const query = await pool_query(pool_query_insert(await filtrar_llaves(request.body, llaves_filtrar), true, "escuela"), "Escuela registrada exitosamente", "Error, no se pudo registrar la escuela");

    if (query.success) {
      const query_id_escuela = await pool_query_unique(`SELECT id_escuela
                                                        FROM escuela
                                                        WHERE clave = '${clave}';`, "", "")

      const llaves_filtrar = ["direccion", "localidad", "colonia", "num_int", "num_ext", "codigo_postal", "municipio_id", "escuela_id"]
      request.body["escuela_id"] = query_id_escuela.response.id_escuela
      await pool_query(pool_query_insert(await filtrar_llaves(request.body, llaves_filtrar), true, "direccion"), "Dirección registrada exitosamente", "Error, no se pudo registrar la dirección");


      const query_socket = await pool_query_unique(`Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
                                                    From escuela
                                                             Join turno On escuela.turno_id = turno.id_turno
                                                             Join municipio On escuela.municipio_id = municipio.id_municipio
                                                    Where escuela.clave = '${clave}'
                                                      And escuela.activo = true;`, "Escuela consultada exitosamente", "Error, no se pudo consultar la escuela");
      socket.emit("agregar_escuela", query_socket.response)

      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const editar_escuela = async (request, response, socket) => {
  const {id_escuela, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if ((request.session.rol_id === 1) || (token_acceso === token_web)) {
    const where = {id_escuela: id_escuela};
    const llaves_filtrar = ["imagen", "id_escuela", "nombre", "pag_web", "telefono", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "tipo_id", "servicio_educativo_id", "sostenimiento_id", "municipio_id", "nivel_id", "usuario_id_modificacion"]
    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, llaves_filtrar), where, "escuela"), "Escuela editada exitosamente", "Error, no se pudo editar la escuela");

    const query_id_escuela = await pool_query_unique(`SELECT escuela.id_escuela, direccion.id_direccion
                                                      FROM escuela
                                                               LEFT JOIN direccion on escuela.id_escuela = direccion.escuela_id
                                                      WHERE escuela.id_escuela = '${id_escuela}';`, "", "")

    if (!query_id_escuela.response.id_direccion) {
      const llaves_filtrar = ["direccion", "localidad", "colonia", "num_int", "num_ext", "codigo_postal", "municipio_id", "escuela_id"]
      request.body["escuela_id"] = query_id_escuela.response.id_escuela
      await pool_query(pool_query_insert(await filtrar_llaves(request.body, llaves_filtrar), true, "direccion"), "Dirección registrada exitosamente", "Error, no se pudo registrar la dirección");
    } else {
      const where = {escuela_id: id_escuela};
      const llaves_filtrar = ["direccion", "localidad", "colonia", "num_int", "num_ext", "codigo_postal", "municipio_id"]
      await pool_query(pool_query_update(await filtrar_llaves(request.body, llaves_filtrar), where, "direccion"), "", "");
    }

    if (query.success) {
      const query_socket = await pool_query_unique(`Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
                                                    From escuela
                                                             Join turno On escuela.turno_id = turno.id_turno
                                                             Join municipio On escuela.municipio_id = municipio.id_municipio
                                                    Where escuela.id_escuela = ${id_escuela}
                                                      And escuela.activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("editar_escuela", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const eliminar_escuela = async (request, response, socket) => {
  const {id_escuela, token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if ((request.session.rol_id === 1) || (token_acceso === token_web)) {
    request.body["activo"] = false
    const query = await pool_query(pool_query_update(request.body, {id_escuela: id_escuela}, "escuela"), "Escuela eliminada exitosamente", "Error, no se pudo eliminar la escuela");

    if (query.success) {
      const query_socket = await pool_query_unique(`Select clave, id_escuela
                                                    From escuela
                                                    Where id_escuela = ${id_escuela};`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("eliminar_escuela", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

module.exports = {
  consultar_escuelas,
  consultar_escuela,
  agregar_escuela,
  editar_escuela,
  eliminar_escuela
}