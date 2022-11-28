const {validate_session, pool_query_unique, pool_query, message_success, message_failure} = require("../functions/servicios");

const token_web = process.env.TOKEN_WEB ? process.env.TOKEN_WEB : "0012b5cc-0f3e-4c66-8fd3-24b828e359a2"
const token_movil = process.env.TOKEN_MOVIL

const consultar_datos_dashboard = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (token_acceso === token_web || request.session.login) {
    const {municipio_id} = request.body
    const datos_niveles = {}

    const query_datos_alumnos_docentes_aulas = await pool_query_unique(`SELECT SUM(alum_hom)            as alum_hom,
                                                                               SUM(alum_muj)            as alum_muj,
                                                                               SUM(alum_hom + alum_muj) as alum_tot,
                                                                               SUM(doc_hom)             as doc_hom,
                                                                               SUM(doc_muj)             as doc_muj,
                                                                               SUM(doc_hom + doc_muj)   as doc_tot,
                                                                               SUM(aulas_exist)         as aulas_exist,
                                                                               SUM(aulas_uso)           as aulas_uso
                                                                        FROM escuela
                                                                        WHERE ${municipio_id !== "" ? ` municipio_id = ${municipio_id} AND ` : ``} activo = true;`, "", "");

    const query_niveles = await pool_query(`SELECT tipo_id
                                            FROM escuela
                                            WHERE ${municipio_id !== "" ? ` municipio_id = ${municipio_id} AND ` : ``} activo = true;`, ``, ``)

    const niveles = [{"name": "preescolar", "id": 1}, {"name": "primaria", "id": 2}, {"name": "secundaria", "id": 3}, {"name": "bachiller", "id": 4}, {"name": "licenciatura", "id": 5}, {"name": "posgrado", "id": 6}]
    niveles.forEach((nivel) => datos_niveles[nivel.name] = (query_niveles.response.filter(({tipo_id}) => tipo_id === nivel.id).length))

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