const {pool_query_unique, message_success, message_failure, pool_query} = require("../functions/servicios");

const consultar_datos_dashboard = async (request, response) => {
  //Consulta query
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
                                                WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} activo = true;`, "", "");

  const query_niveles = await pool_query(`SELECT tipo_id FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} activo = true;`, ``, ``)

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
};

const consultar_niveles = async (request, response) => {
  //Consulta query
  const {municipio_id} = request.body

  const query = await pool_query_unique(`SELECT SUM(alum_hom)            as alum_hom,
                                                       SUM(alum_muj)            as alum_muj,
                                                       SUM(alum_hom + alum_muj) as alum_tot,
                                                       SUM(doc_hom)             as doc_hom,
                                                       SUM(doc_muj)             as doc_muj,
                                                       SUM(doc_hom + doc_muj)   as doc_tot,
                                                       SUM(aulas_exist)         as aulas_exist,
                                                       SUM(aulas_uso)           as aulas_uso
                                                FROM escuela
                                                WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} activo = true;`, "Datos consultados exitosamente", "Error, no se pudieron consultar los datos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
};

module.exports = {
  consultar_datos_dashboard,
  consultar_niveles
};
