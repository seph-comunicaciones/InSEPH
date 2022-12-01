const {message_failure, pool_query, validate_session, message_success, validar_llaves} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_indicadores_internacionales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT meta_internacional.meta_internacional, indicador_internacional.*
                                          FROM meta_internacional
                                                   JOIN indicador_internacional
                                                        on meta_internacional.id_meta_internacional = indicador_internacional.meta_internacional_id;`, "Indicadores internacionales consultados exitosamente", "Error, no se pudieron consultar indicadores internacionales");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      if (query.failure) {
        return response.status(400).json(query)
      }
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_indicadores_nacionales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT indicador_nacional.*,
                                                 categoria_indicador_nacional.categoria_indicador_nacional,
                                                 filtro_indicador_nacional.filtro_indicador_nacional
                                          FROM indicador_nacional
                                                   JOIN categoria_indicador_nacional on categoria_indicador_nacional.id_categoria_indicador_nacional =
                                                                                        indicador_nacional.categoria_indicador_nacional_id
                                                   JOIN filtro_indicador_nacional on filtro_indicador_nacional.id_filtro_indicador_nacional =
                                                                                     indicador_nacional.filtro_indicador_nacional_id;`, "", "Error, no se pudieron consultar indicadores nacionales");

    if (query.success) {
      const indicador_sep = []
      const indicador_inegi = []
      const indicador_coneval = []
      const indicador_imco = []

      query.response.forEach((indicador) => {
        const {filtro_indicador_nacional} = indicador

        switch (filtro_indicador_nacional) {
          case "SEP":
            indicador_sep.push(indicador)
            break
          case "INEGI 2022":
            indicador_inegi.push(indicador)
            break
          case "CONEVAL 2022":
            indicador_coneval.push(indicador)
            break
          case "IMCO 2021-2022":
            indicador_imco.push(indicador)
            break
        }
      })

      const indicadores_nacionales = [
        {
          "nombre_indicador": "SEP",
          "indicadores": indicador_sep
        },
        {
          "nombre_indicador": "INEGI 2022",
          "indicadores": indicador_inegi
        },
        {
          "nombre_indicador": "CONEVAL 2022",
          "indicadores": indicador_coneval
        },
        {
          "nombre_indicador": "IMCO 2021-2022",
          "indicadores": indicador_imco
        },
      ]

      return response.status(200).json(message_success("Indicadores nacionales consultados exitosamente", indicadores_nacionales));
    } else {
      if (query.failure) {
        return response.status(400).json(query);
      }
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

const consultar_indicadores_institucionales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Validar llaves obligatorias
  const llaves_obligatorias = ["subsecretaria", "direccion_general", "nivel_educativo"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const {subsecretaria, direccion_general, nivel_educativo} = request.body
    let where = "Where"

    if (subsecretaria !== "") {
      where += ` subsecretaria_indicador_institucional_id = ${subsecretaria} `
    }
    if (direccion_general !== "") {
      where += ` direccion_general_indicador_institucional_id = ${direccion_general} `
    }
    if (nivel_educativo !== "") {
      where += ` nivel_edcuativo_indicador_institucional_id = ${nivel_educativo} `
    }

    const query = await pool_query(`SELECT * FROM indicador_institucional ${where.replaceAll("  ", " AND ")}  ORDER BY id_indicador_institucional;`, "Indicadores institucionales consultados exitosamente", "Error, no se pudieron consultar indicadores institucionales");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      if (query.failure) {
        return response.status(400).json(query);
      }
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

module.exports = {
  consultar_indicadores_internacionales,
  consultar_indicadores_nacionales,
  consultar_indicadores_institucionales
}