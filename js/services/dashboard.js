const {validate_session, pool_query_unique, pool_query, message_success, message_failure} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_datos_dashboard = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if ((token_acceso === TOKEN_WEB || token_acceso === TOKEN_MOVIL) || request.session.login) {
    const {municipio_id} = request.body
    const datos_niveles = {}

    const query_datos_alumnos_docentes_aulas = await pool_query_unique(`SELECT SUM(alumnos_hombres)                     as alum_hom,
             SUM(alumnos_mujeres)                     as alum_muj,
             SUM(docentes_hombres)                    as doc_hom,
             SUM(docentes_mujeres)                    as doc_muj,
             SUM(aulas_existentes)                    as aulas_exist,
             SUM(aulas_uso)                           as aulas_uso
      FROM escuela WHERE ${municipio_id !== "" ? ` municipio_id_municipio = ${municipio_id} AND ` : ``} activo = true;`, "", "");

    const query_niveles = await pool_query(`SELECT nivel_id_nivel FROM escuela WHERE ${municipio_id !== "" ? ` municipio_id_municipio = ${municipio_id} AND ` : ``} activo = true;`, ``, ``)

    const niveles = [{"name": "SIN_DEFINIR", "id": 0}, {"name": "INICIAL", "id": 1}, {"name": "BASICA", "id": 2}, {"name": "MEDIA_SUPERIOR", "id": 3}, {"name": "SUPERIOR", "id": 4}, {"name": "CAPACITACION", "id": 5}, {"name": "ESPECIAL", "id": 6}, {"name": "OTROS", "id": 6}]
    niveles.forEach((nivel) => datos_niveles[nivel.name] = (query_niveles.response.filter(({nivel_id_nivel}) => nivel_id_nivel === nivel.id).length))

    if (query_datos_alumnos_docentes_aulas.success && query_niveles.success) {
      const query = {
        "datos_alumnos_docentes_aulas": query_datos_alumnos_docentes_aulas.response,
        "datos_niveles": datos_niveles,
      }
      return response.status(200).json(message_success("Datos consultados exitosamente", query));
    } else {
      return response.status(400).json(message_failure("No se pudieron consultar los datos"));
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
}

module.exports = {
  consultar_datos_dashboard
}