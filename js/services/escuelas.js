const {
  pool_query,
  uuidv4,
  message_success,
  message_failure,
  validar_llaves,
} = require("../functions/servicios");

const consultar_escuelas = async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_municipio"];

  const validacion_llaves = await validar_llaves(
    llaves_obligatorias,
    request.body
  );

  if (!validacion_llaves.success) {
    return response
      .status(400)
      .json(message_failure(validacion_llaves.message));
  }

  //Consulta query
  const { id_municipio } = request.body;

  const query = await pool_query(
    `Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
    From escuela
    Join turno On escuela.turno_id = turno.id_turno
    Join municipio On escuela.municipio_id = municipio.id_municipio ${
      id_municipio !== ""
        ? `  Where municipio.id_municipio = ${id_municipio} `
        : ""
    };`,
    "Escuelas consultadas existosamente",
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

  const validacion_llaves = await validar_llaves(
    llaves_obligatorias,
    request.body
  );

  if (!validacion_llaves.success)
    return response
      .status(400)
      .json(message_failure(validacion_llaves.message));

  //Consulta query
  const { id_escuela } = request.body;

  const query = await pool_query(
    `Select * From escuela Where id_escuela = ${id_escuela};`,
    "Escuela consultada existosamente",
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

  //Consulta query
  const query = await pool_query(
    `INSERT into public.escuela (uuid, clave, nombre, pag_web, alum_muj, alum_hom, doc_muj, doc_hom, aulas_exist, aulas_uso, telefono, turno_id, control_id)
    VALUES ('${uuidv4()}','','','', 1, 1, 1, 1, 1, 1,'', 1, 1);`,
    "Escuela registrada existosamente",
    "Error, no se pudo registrar la escuela"
  );

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_escuelas,
  consultar_escuela,
  agregar_escuela,
};
