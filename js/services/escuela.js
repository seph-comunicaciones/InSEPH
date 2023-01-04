const {validate_session, pool_query_unique, pool_query, message_failure, validar_llaves, pool_query_insert, filtrar_llaves, pool_query_update, get_uuid} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

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
  if (request.session.login || (token_acceso === TOKEN_WEB || token_acceso === TOKEN_MOVIL)) {
    const query = await pool_query(
      `SELECT escuela.id_escuela,
                     escuela.id_cct,
                     escuela.nom_escuela,
                     municipio.nom_municipio,
                     turno1.nom_turno1,
                     turno2.nom_turno2,
                     turno3.nom_turno3
              FROM escuela
                       JOIN turno1 on escuela.turno1_id_turno1 = turno1.id_turno1
                       JOIN turno2 on escuela.turno2_id_turno2 = turno2.id_turno2
                       JOIN turno3 on escuela.turno3_id_turno3 = turno3.id_turno3
                       JOIN status on escuela.status_id_status = status.id_status
                       JOIN municipio on escuela.municipio_id_municipio = municipio.id_municipio ${id_municipio !== "" ? ` Where status.id_status = 1 AND municipio.id_municipio = ${id_municipio} And escuela.activo = true ` : " Where status.id_status = 1 AND escuela.activo = true "};`,
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
  if (request.session.login || (token_acceso === TOKEN_WEB || token_acceso === TOKEN_MOVIL)) {
    const query = await pool_query_unique(
      `select escuela.id_cct                                        as CCT,
                 escuela.id_escuela,
                 marca.nom_marca                                       as marca,
                 escuela.nom_escuela,
                 municipio.nom_municipio,
                 codigo_postal.d_asenta                                as colonia_localidad,
                 inmueble.asenta2                                      as colonia_localidad2,
                 codigo_postal.d_tipo_asenta                           as tipo_asentamiento,
                 inmueble.vialidad_principal                           as calle_principal,
                 inmueble.vialidad_derecha,
                 inmueble.vialidad_izquierda,
                 inmueble.vialidad_posterior,
                 inmueble.num_ext,
                 inmueble.alf_ext,
                 inmueble.num_int,
                 inmueble.alf_int,
                 inmueble.desc_ubicacion,
                 inmueble.latitud,
                 inmueble.longitud,
                 codigo_postal.d_zona                                  as zona,
                 region.nom_region                                     as region,
                 sost_control.nom_sost_control                         as sostenimiento_control,
                 sost_subcontrol.nom_sost_subcontrol                   as sostenimiento_sucontrol,
                 sost_dependencia1.nom_sost_dependencia1               as sostenimiento_dependencia1,
                 sost_dependencia2.nom_sost_dependencia2               as sostenimiento_dependencia2,
                 sost_dependencia3.nom_sost_dependencia3               as sostenimiento_dependencia3,
                 sost_dependencia4.nom_sost_dependencia4               as sostenimiento_dependencia4,
                 sost_servicio.num_sost_servicio                       as sostenimiento_servicio,
                 dep_operativa1.nom_dep_operativa1                     as dependencia_operativa1,
                 dep_operativa2.nom_dep_operativa2                     as dependencia_operativa2,
                 dep_operativa3.nom_dep_operativa3                     as dependencia_operativa3,
                 dep_operativa4.nom_dep_operativa4                     as dependencia_operativa4,
                 dep_operativa5.nom_dep_operativa5                     as dependencia_operativa5,
                 escuela.supervision_id_cct                            as CCT_supervision,
                 escuela.jefsec_id_cct                                 as CCT_jefaturasector,
                 escuela.serreg_id_cct                                 as CCT_serviciosregionales,
                 escuela.institucion_plantel                           as cct_plantel,
                 turno1.nom_turno1                                     as turno1,
                 turno2.nom_turno2                                     as turno2,
                 turno3.nom_turno3                                     as turno3,
                 nivel.nom_nivel,
                 tipo.nom_tipo,
                 servicio_educativo.nom_servicio_educativo,
                 cam_servicio.nom_cam_servicio                         as servicio_cam,
                 caracteristica1.nom_caracteristica1                   as caracteristica1,
                 caracteristica2.nom_caracteristica2                   as caracteristica2,
                 director.nombre_director,
                 escuela.telefono,
                 escuela.email,
                 escuela.pag_web,
                 escuela.activo,
                 escuela.imagen,
                 escuela.alumnos_mujeres,
                 escuela.alumnos_hombres,
                 escuela.docentes_mujeres,
                 escuela.docentes_hombres,
                 escuela.aulas_uso,
                 escuela.aulas_existentes,
                 LEFT(cast(escuela.fecha_modificacion AS varchar), 10) AS fecha_modificacion,
                 escuela.hora_modificacion,
                 usuario.nombre                                        as usuario_nombre_modificacion,
                 usuario.apellido_paterno                              as usuario_apellido_paterno_modificacion,
                 usuario.apellido_materno                              as usuario_apellido_materno_modificacion
          from escuela
                   left join marca on marca.id_marca = escuela.marca_id_marca
                   left join inmueble on inmueble.id_inmueble = escuela.inmueble_id_inmueble
                   left join municipio on municipio.id_municipio = escuela.municipio_id_municipio
                   left join codigo_postal on codigo_postal.id_asenta = inmueble.id_inmueble
                   left join region on region.id_region = escuela.region_id_region
                   left join sost_control on sost_control.id_sost_control = escuela.sost_control_id_sost_control
                   left join sost_subcontrol on sost_subcontrol.id_sost_subcontrol = escuela.sost_subcontrol_id_sost_subcontrol
                   left join sost_dependencia1
                             on sost_dependencia1.id_sost_dependencia1 = escuela.sost_dependencian1_id_sost_dependencia1
                   left join sost_dependencia2
                             on sost_dependencia2.id_sost_dependencia2 = escuela.sost_dependencian2_id_sost_dependencia2
                   left join sost_dependencia3
                             on sost_dependencia3.id_sost_dependencia3 = escuela.sost_dependencian3_id_sost_dependencia3
                   left join sost_dependencia4
                             on sost_dependencia4.id_sost_dependencia4 = escuela.sost_dependencian4_id_sost_dependencia4
                   left join sost_servicio on sost_servicio.id_sost_servicio = escuela.sost_servicio_id_sost_servicio
                   left join dep_operativa1 on dep_operativa1.id_dep_operativa1 = escuela.dep_operativa1_id_dep_operativa1
                   left join dep_operativa2 on dep_operativa2.id_dep_operativa2 = escuela.dep_operativa2_id_dep_operativa2
                   left join dep_operativa3 on dep_operativa3.id_dep_operativa3 = escuela.dep_operativa3_id_dep_operativa3
                   left join dep_operativa4 on dep_operativa4.id_dep_operativa4 = escuela.dep_operativa4_id_dep_operativa4
                   left join dep_operativa5 on dep_operativa5.id_dep_operativa5 = escuela.dep_operativa5_id_dep_operativa5
                   left join turno1 on turno1.id_turno1 = escuela.turno1_id_turno1
                   left join turno2 on turno2.id_turno2 = escuela.turno2_id_turno2
                   left join turno3 on turno3.id_turno3 = escuela.turno3_id_turno3
                   left join nivel on nivel.id_nivel = escuela.nivel_id_nivel
                   left join tipo on tipo.id_tipo = escuela.tipo_id_tipo
                   left join servicio_educativo
                             on servicio_educativo.id_servicio_educativo = escuela.servicio_educativo_id_servicio_educativo
                   left join cam_servicio on cam_servicio.id_cam_servicio = escuela.cam_servicio_id_cam_servicio
                   left join caracteristica1 on caracteristica1.id_caracteristica1 = escuela.caracteristica1_id_caracteristica1
                   left join caracteristica2 on caracteristica2.id_caracteristica2 = escuela.caracteristica2_id_caracteristica2
                   left join director on director.id_director = escuela.director_id_director
                   join usuario on escuela.usuario_id_modificacion = usuario.id_usuario
          where escuela.id_escuela = ${id_escuela}
            AND escuela.activo = true
            AND escuela.status_id_status = 1;`,
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
  const {token_acceso, id_cct} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_cct", "alumnos_hombres", "alumnos_mujeres", "aulas_existentes", "aulas_uso", "dep_operativa1_id_dep_operativa1", "docentes_hombres", "docentes_mujeres", "email", "municipio_id_municipio", "nivel_id_nivel", "nom_escuela", "region_id_region", "serreg_id_cct", "servicio_educativo_id_servicio_educativo", "sost_control_id_sost_control", "sost_servicio_id_sost_servicio", "sost_subcontrol_id_sost_subcontrol", "status_id_status", "telefono", "tipo_id_tipo", "turno1_id_turno1"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if ((request.session.rol_id === 1 || request.session.rol_id === 2) || (token_acceso === TOKEN_WEB)) {
    //Validar que no exista esta clave
    const validacion = await pool_query_unique(`SELECT id_cct
                                                FROM escuela
                                                where id_cct = '${id_cct}';`, "", "Error, no se pudo agregar la escuela")

    if (validacion.response && validacion.success && validacion.response.id_cct === id_cct.toString()) return response.status(200).json(message_failure("Clave no disponible"))

    //Agregar director
    const uuid_director = await get_uuid()
    const query_director = await pool_query(pool_query_insert(await filtrar_llaves(request.body, ["nombre_director"]), false, "director", uuid_director), "Director registrado exitosamente", "Error, no se pudo registrar el director");
    const director = await pool_query_unique(`SELECT id_director FROM director Where uuid = '${uuid_director}';`);
    request.body["director_id_director"] = director.response.id_director

    //Agregar inmueble
    const uuid_inmueble = await get_uuid()
    const query_inmueble = await pool_query(pool_query_insert(await filtrar_llaves(request.body, ["municipio_id_municipio", "id_asenta_codigo_postal", "asenta2", "vialidad_principal", "vialidad_derecha", "vialidad_izquierda", "vialidad_posterior", "num_ext", "alf_ext", "num_int", "alf_int", "desc_ubicacion", "latitud", "longitud"]), false, "inmueble", uuid_inmueble), "Inmueble registrado exitosamente", "Error, no se pudo registrar el inmueble");
    const inmueble = await pool_query_unique(`SELECT id_inmueble FROM inmueble Where uuid = '${uuid_inmueble}';`);
    request.body["inmueble_id_inmueble"] = inmueble.response.id_inmueble

    if (query_director.success && query_inmueble.success) {
      const llaves_filtrar = ["imagen", "id_cct", "marca_id_marca", "nom_escuela", "status_id_status", "inmueble_id_inmueble", "municipio_id_municipio", "region_id_region", "sost_control_id_sost_control", "sost_subcontrol_id_sost_subcontrol", "sost_dependencian1_id_sost_dependencia1", "sost_dependencian2_id_sost_dependencia2", "sost_dependencian3_id_sost_dependencia3", "sost_dependencian4_id_sost_dependencia4", "sost_servicio_id_sost_servicio", "dep_operativa1_id_dep_operativa1", "dep_operativa2_id_dep_operativa2", "dep_operativa3_id_dep_operativa3", "dep_operativa4_id_dep_operativa4", "dep_operativa5_id_dep_operativa5", "supervision_id_cct", "jefsec_id_cct", "serreg_id_cct", "institucion_plantel", "turno1_id_turno1", "turno2_id_turno2", "turno3_id_turno3", "nivel_id_nivel", "tipo_id_tipo", "servicio_educativo_id_servicio_educativo", "cam_servicio_id_cam_servicio", "caracteristica1_id_caracteristica1", "caracteristica2_id_caracteristica2", "telefono", "email", "director_id_director", "alumnos_hombres", "alumnos_mujeres", "docentes_hombres", "docentes_mujeres", "aulas_uso", "aulas_existentes", "pag_web", "usuario_id_modificacion",]

      const query = await pool_query(pool_query_insert(await filtrar_llaves(request.body, llaves_filtrar), true, "escuela"), "Escuela registrada exitosamente", "Error, no se pudo registrar la escuela");

      const query_socket = await pool_query_unique(
        `select escuela.id_cct                                        as CCT,
                 escuela.id_escuela,
                 marca.nom_marca                                       as marca,
                 escuela.nom_escuela,
                 municipio.nom_municipio,
                 codigo_postal.d_asenta                                as colonia_localidad,
                 inmueble.asenta2                                      as colonia_localidad2,
                 codigo_postal.d_tipo_asenta                           as tipo_asentamiento,
                 inmueble.vialidad_principal                           as calle_principal,
                 inmueble.vialidad_derecha,
                 inmueble.vialidad_izquierda,
                 inmueble.vialidad_posterior,
                 inmueble.num_ext,
                 inmueble.alf_ext,
                 inmueble.num_int,
                 inmueble.alf_int,
                 inmueble.desc_ubicacion,
                 inmueble.latitud,
                 inmueble.longitud,
                 codigo_postal.d_zona                                  as zona,
                 region.nom_region                                     as region,
                 sost_control.nom_sost_control                         as sostenimiento_control,
                 sost_subcontrol.nom_sost_subcontrol                   as sostenimiento_sucontrol,
                 sost_dependencia1.nom_sost_dependencia1               as sostenimiento_dependencia1,
                 sost_dependencia2.nom_sost_dependencia2               as sostenimiento_dependencia2,
                 sost_dependencia3.nom_sost_dependencia3               as sostenimiento_dependencia3,
                 sost_dependencia4.nom_sost_dependencia4               as sostenimiento_dependencia4,
                 sost_servicio.num_sost_servicio                       as sostenimiento_servicio,
                 dep_operativa1.nom_dep_operativa1                     as dependencia_operativa1,
                 dep_operativa2.nom_dep_operativa2                     as dependencia_operativa2,
                 dep_operativa3.nom_dep_operativa3                     as dependencia_operativa3,
                 dep_operativa4.nom_dep_operativa4                     as dependencia_operativa4,
                 dep_operativa5.nom_dep_operativa5                     as dependencia_operativa5,
                 escuela.supervision_id_cct                            as CCT_supervision,
                 escuela.jefsec_id_cct                                 as CCT_jefaturasector,
                 escuela.serreg_id_cct                                 as CCT_serviciosregionales,
                 escuela.institucion_plantel                           as cct_plantel,
                 turno1.nom_turno1                                     as turno1,
                 turno2.nom_turno2                                     as turno2,
                 turno3.nom_turno3                                     as turno3,
                 nivel.nom_nivel,
                 tipo.nom_tipo,
                 servicio_educativo.nom_servicio_educativo,
                 cam_servicio.nom_cam_servicio                         as servicio_cam,
                 caracteristica1.nom_caracteristica1                   as caracteristica1,
                 caracteristica2.nom_caracteristica2                   as caracteristica2,
                 director.nombre_director,
                 escuela.telefono,
                 escuela.email,
                 escuela.pag_web,
                 escuela.activo,
                 escuela.imagen,
                 escuela.alumnos_mujeres,
                 escuela.alumnos_hombres,
                 escuela.docentes_mujeres,
                 escuela.docentes_hombres,
                 escuela.aulas_uso,
                 escuela.aulas_existentes,
                 LEFT(cast(escuela.fecha_modificacion AS varchar), 10) AS fecha_modificacion,
                 escuela.hora_modificacion,
                 usuario.nombre                                        as usuario_nombre_modificacion,
                 usuario.apellido_paterno                              as usuario_apellido_paterno_modificacion,
                 usuario.apellido_materno                              as usuario_apellido_materno_modificacion
          from escuela
                   left join marca on marca.id_marca = escuela.marca_id_marca
                   left join inmueble on inmueble.id_inmueble = escuela.inmueble_id_inmueble
                   left join municipio on municipio.id_municipio = escuela.municipio_id_municipio
                   left join codigo_postal on codigo_postal.id_asenta = inmueble.id_inmueble
                   left join region on region.id_region = escuela.region_id_region
                   left join sost_control on sost_control.id_sost_control = escuela.sost_control_id_sost_control
                   left join sost_subcontrol on sost_subcontrol.id_sost_subcontrol = escuela.sost_subcontrol_id_sost_subcontrol
                   left join sost_dependencia1
                             on sost_dependencia1.id_sost_dependencia1 = escuela.sost_dependencian1_id_sost_dependencia1
                   left join sost_dependencia2
                             on sost_dependencia2.id_sost_dependencia2 = escuela.sost_dependencian2_id_sost_dependencia2
                   left join sost_dependencia3
                             on sost_dependencia3.id_sost_dependencia3 = escuela.sost_dependencian3_id_sost_dependencia3
                   left join sost_dependencia4
                             on sost_dependencia4.id_sost_dependencia4 = escuela.sost_dependencian4_id_sost_dependencia4
                   left join sost_servicio on sost_servicio.id_sost_servicio = escuela.sost_servicio_id_sost_servicio
                   left join dep_operativa1 on dep_operativa1.id_dep_operativa1 = escuela.dep_operativa1_id_dep_operativa1
                   left join dep_operativa2 on dep_operativa2.id_dep_operativa2 = escuela.dep_operativa2_id_dep_operativa2
                   left join dep_operativa3 on dep_operativa3.id_dep_operativa3 = escuela.dep_operativa3_id_dep_operativa3
                   left join dep_operativa4 on dep_operativa4.id_dep_operativa4 = escuela.dep_operativa4_id_dep_operativa4
                   left join dep_operativa5 on dep_operativa5.id_dep_operativa5 = escuela.dep_operativa5_id_dep_operativa5
                   left join turno1 on turno1.id_turno1 = escuela.turno1_id_turno1
                   left join turno2 on turno2.id_turno2 = escuela.turno2_id_turno2
                   left join turno3 on turno3.id_turno3 = escuela.turno3_id_turno3
                   left join nivel on nivel.id_nivel = escuela.nivel_id_nivel
                   left join tipo on tipo.id_tipo = escuela.tipo_id_tipo
                   left join servicio_educativo
                             on servicio_educativo.id_servicio_educativo = escuela.servicio_educativo_id_servicio_educativo
                   left join cam_servicio on cam_servicio.id_cam_servicio = escuela.cam_servicio_id_cam_servicio
                   left join caracteristica1 on caracteristica1.id_caracteristica1 = escuela.caracteristica1_id_caracteristica1
                   left join caracteristica2 on caracteristica2.id_caracteristica2 = escuela.caracteristica2_id_caracteristica2
                   left join director on director.id_director = escuela.director_id_director
                   join usuario on escuela.usuario_id_modificacion = usuario.id_usuario
          where escuela.id_cct = '${id_cct}'
            AND escuela.activo = true
            AND escuela.status_id_status = 1;`,
        "Escuela consultada exitosamente",
        "Error, no se pudo consultar la escuela"
      );
      socket.emit("agregar_escuela", query_socket.response)

      return response.status(200).json(query);
    } else {
      return response.status(400).json(message_failure("Error, no se pudo registrar la escuela"));
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
  if ((request.session.rol_id === 1) || (token_acceso === TOKEN_WEB)) {
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
  if ((request.session.rol_id === 1) || (token_acceso === TOKEN_WEB)) {
    request.body["activo"] = false
    const query = await pool_query(pool_query_update(request.body, {id_escuela: id_escuela}, "escuela"), "Escuela eliminada exitosamente", "Error, no se pudo eliminar la escuela");

    if (query.success) {
      const query_socket = await pool_query_unique(`Select id_cct, id_escuela
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