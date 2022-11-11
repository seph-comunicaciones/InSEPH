const {pool_query_unique, message_success, message_failure} = require("../functions/servicios");

const consultar_datos_alumnos_docentes_aulas = async (request, response) => {
  //Consulta query
  const {municipio_id} = request.body

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

  const query_nivel_preescolar = await pool_query_unique(`SELECT SUM(tipo_id) AS preescolar FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 1 AND activo = true;`, "", "")
  const query_nivel_primaria = await pool_query_unique(`SELECT SUM(tipo_id) AS primaria FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 2 AND activo = true;`, "", "")
  const query_nivel_secundaria = await pool_query_unique(`SELECT SUM(tipo_id) AS secundaria FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 3 AND activo = true;`, "", "")
  const query_nivel_bachiller = await pool_query_unique(`SELECT SUM(tipo_id) AS bachiller FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 4 AND activo = true;`, "", "")
  const query_nivel_licenciatura = await pool_query_unique(`SELECT SUM(tipo_id) AS licenciatura FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 5 AND activo = true;`, "", "")
  const query_nivel_posgrado = await pool_query_unique(`SELECT SUM(tipo_id) AS posgrado FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} tipo_id = 6 AND activo = true;`, "", "")

  if (query_datos_alumnos_docentes_aulas.success && query_nivel_preescolar.success) {
    const query = {
      "datos_alumnos_docentes_aulas": query_datos_alumnos_docentes_aulas.response,
      "datos_preescolar": query_nivel_preescolar.response,
      "datos_primaria": query_nivel_primaria.response,
      "datos_secundaria": query_nivel_secundaria.response,
      "datos_bachiller": query_nivel_bachiller.response,
      "datos_licenciatura": query_nivel_licenciatura.response,
      "datos_posgrado": query_nivel_posgrado.response,
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
  consultar_datos_alumnos_docentes_aulas,
  consultar_niveles
};
