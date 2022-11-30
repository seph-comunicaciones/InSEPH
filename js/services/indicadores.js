const {message_failure, pool_query, validate_session} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_indicadores_internacionales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.rol_id === 1 || token_acceso === TOKEN_WEB) {
    const query_meta = await pool_query(`SELECT id_meta, meta FROM meta;`, "Indicadores internacionales consultados exitosamente", "Error, no se pudieron consultar indicadores internacionales");
    const query_indicador = await pool_query(`SELECT indicador_mexico, nacional_porcentaje, hidalgo_porcentaje, posicion, meta_id, nacional_calculo, hidalgo_calculo, ascendente FROM indicador;`, "", "Error, no se pudieron consultar indicadores internacionales");

    if (query_meta.success && query_indicador.success) {
      const {response: metas} = query_meta
      const {response: indicadores} = query_indicador

      metas.forEach((meta) => {
        const {id_meta} = meta
        let indicadores_metas = []

        for (let i = 0; i < indicadores.length; i++) {
          const {meta_id} = indicadores[i]
          if (meta_id === id_meta) {
            indicadores_metas.push(indicadores[i])
            indicadores.slice(i, i + 1)
          }
        }

        meta.indicadores = indicadores_metas
      })

      return response.status(200).json(query_meta);
    } else {
      if (query_meta.failure) return response.status(400).json(query_meta);
      if (query_indicador.failure) return response.status(400).json(query_indicador);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

module.exports = {
  consultar_indicadores_internacionales
}