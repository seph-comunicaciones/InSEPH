const {pool_query, pool_query_unique, pool_query_insert, pool_query_update, message_success, message_failure, validar_llaves} = require("../functions/servicios");

const consultar_escuelas = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_municipio"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) {
    return response.status(400).json(message_failure(validacion_llaves.message));
  }

  //Consulta query
  const {id_municipio} = request.body;

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
};

const consultar_escuela = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela} = request.body;

  const query = await pool_query_unique(
    `Select escuela.*, turno.nom_turno, control.nom_control, modelo.nom_modelo, sostenimiento.nom_sostenimiento, municipio.nom_municipio, nivel.nom_nivel, tipo.nom_tipo, servicio_educativo.nom_servicio_educativo
    From escuela 
    Join turno On escuela.turno_id = turno.id_turno
    Join control On escuela.control_id = control.id_control
    Join modelo On escuela.modelo_id = modelo.id_modelo
    Join sostenimiento On escuela.sostenimiento_id = sostenimiento.id_sostenimiento
    Join municipio On escuela.municipio_id = municipio.id_municipio
    Join nivel On escuela.nivel_id = nivel.id_nivel
	  Join tipo On escuela.tipo_id = tipo.id_tipo
	  Join servicio_educativo On escuela.servicio_educativo_id = servicio_educativo.id_servicio_educativo
    Where escuela.id_escuela = '${id_escuela}' AND escuela.activo = true;`,
    "Escuela consultada exitosamente",
    "Error, no se pudo consultar la escuela"
  );

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

const agregar_escuela = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["clave", "nombre", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "sostenimiento_id", "municipio_id", "nivel_id", "tipo_id", "servicio_educativo_id"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso} = request.body;

  if ((request.session.rol_id === 1 || request.session.rol_id === 2) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    const query = await pool_query(pool_query_insert(request.body, true, "escuela"), "Escuela registrada exitosamente", "Error, no se pudo registrar la escuela");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const editar_escuela = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela, token_acceso} = request.body;
  if ((request.session.rol_id === 1) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    const where = {id_escuela: id_escuela};
    const query = await pool_query(pool_query_update(request.body, where, "escuela"), "Escuela editada exitosamente", "Error, no se pudo editar la escuela");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
};

const eliminar_escuela = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela, token_acceso} = request.body;
  if ((request.session.rol_id === 1) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    const query = await pool_query(`Update escuela Set activo = 'false' Where id_escuela = '${id_escuela}';`, "Escuela eliminada exitosamente", "Error, no se pudo eliminar la escuela");

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
  consultar_escuelas,
  consultar_escuela,
  agregar_escuela,
  editar_escuela,
  eliminar_escuela: eliminar_escuela,
};
