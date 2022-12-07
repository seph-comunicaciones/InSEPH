const {message_failure, pool_query, validate_session, message_success, validar_llaves} = require("./servicios");

const {TOKEN_WEB, TOKEN_MOVIL} = process.env

const consultar_indicadores_internacionales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.login || token_acceso === TOKEN_WEB) {
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
  if (request.session.login || token_acceso === TOKEN_WEB) {
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

      const indicadores_chart_nacionales = [
        {
          "tittle": "Global",
          "charts": [
            {
              "sub_tittle": "Eficiencia del Sistema Educativo",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [24, 26]
                },
                {
                  "name": 'Estatal',
                  "data": [32, 34]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2017-2018 Lugar 6', '2021-2022 Lugar 9'],
              "message": "9° Lugar nacional",
              "semaforo": "#ffc000",
              "footer": "En Hidalgo, de cada 100 estudiantes que iniciaron la educación primaria 16 años antes, 34 concluyeron la educación superior."
            },
            {
              "sub_tittle": "Cobertura de Educación Básica",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [96.6, 90.5]
                },
                {
                  "name": 'Estatal',
                  "data": [98.4, 91.8]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 6', '2021-2022 Lugar 13'],
              "semaforo": "#ffc000",
              "message": "Disminuyó 6.6 puntos porcentuales",
            },
          ],
        },
        {
          "tittle": "Preescolar",
          "charts": [
            {
              "sub_tittle": "Eficiencia del Sistema Educativo",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [119307, 123103, 120790, 118280, 112916, 103379, 98211]
                },
              ],
              "colors": ["#621132"],
              "categories": ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"],
              "message": "La matrícula se redujo en 14 mil 705 estudiantes",
              "semaforo": "#c00000",
              "note": "Entre el ciclo 2019-2020 y el 2021-2022 por la pandemia",
            },
            {
              "sub_tittle": "Educación Preescolar Atención a 3 a 5 años",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [71.8, 63.3]
                },
                {
                  "name": 'Estatal',
                  "data": [73, 60.7]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 13', '2021-2022 Lugar 20'],
              "message": "Disminuyó 12.3 puntos porcentuales",
              "semaforo": "#c00000",
            },
          ],
        },
        {
          "tittle": "Primaria",
          "charts": [
            {
              "sub_tittle": "Educación Primaria Matrícula",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [335796, 354488, 353199, 352983, 349453, 343534, 337369]
                },
              ],
              "colors": ["#621132"],
              "categories": ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"],
              "message": "La matrícula se redujo en 12 mil 084 estudiantes",
              "semaforo": "#c00000",
              "note": "Entre el ciclo 2019-2020 y el 2021-2022",
            },
            {
              "sub_tittle": "Educación Primaria Cobertura",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [106, 101.9]
                },
                {
                  "name": 'Estatal',
                  "data": [107.4, 102.1]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 6', '2021-2022 Lugar 12'],
              "message": "Mantenemos cobertura total",
              "semaforo": "#9bbb59",
              "footer": "Los indicadores por encima del 100% son producto de la emigración que reciben los municipios del sur del estado, proveniente principalmente de la CDMX y el Estado de México.",
            },
            {
              "sub_tittle": "Educación Primaria Reprobación",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [0.9, 0.5]
                },
                {
                  "name": 'Estatal',
                  "data": [0.7, 0.05]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 14', '2021-2022 Lugar 10'],
              "message": "4° Lugar nacional",
              "semaforo": "#9bbb59",
            },
            {
              "sub_tittle": "Educación Primaria Abandono Escolar",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [0.7, 0.5]
                },
                {
                  "name": 'Estatal',
                  "data": [-0.2, -0.06]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 6', '2020-2021 Lugar 10'],
              "message": "10° Lugar nacional",
              "semaforo": "#9bbb59",
            },
            {
              "sub_tittle": "Educación Primaria Eficiencia Terminal",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [98.3, 96.7]
                },
                {
                  "name": 'Estatal',
                  "data": [102.9, 101.4]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 4', '2020-2021 Lugar 4'],
              "message": "4° Lugar nacional",
              "semaforo": "#9bbb59",
              "note": "Mantenemos Eficiencia terminal del 100%",
            },
          ],
        },
        {
          "tittle": "Secundaria",
          "charts": [
            {
              "sub_tittle": "Educación Secundaria Matrícula",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [172417, 173515, 173590, 172720, 171896, 171868, 169276]
                },
              ],
              "colors": ["#621132"],
              "categories": ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"],
              "message": "La matrícula se redujo en 2 mil 620 estudiantes",
              "semaforo": "#c00000",
              "note": "Entre el ciclo 2019-2020 y el 2021-2022"
            },
            {
              "sub_tittle": "Educación Secundaria Cobertura",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [102, 96.1]
                },
                {
                  "name": 'Estatal',
                  "data": [105.5, 101.1]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 5', '2021-2022 Lugar 5'],
              "message": "5° Lugar nacional",
              "semaforo": "#9bbb59",
              "note": "Mantenemos Cobertura total"
            },
            {
              "sub_tittle": "Educación Secundaria Absorción",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [97.2, 93.1]
                },
                {
                  "name": 'Estatal',
                  "data": [99.2, 96.7]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 10', '2021-2022 Lugar 9'],
              "message": "9° Lugar nacional",
              "semaforo": "#ffc000",
              "note": "Disminuyó 2.5 puntos porcentuales"
            },
            {
              "sub_tittle": "Educación Secundaria Reprobación",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [5.2, 1.8]
                },
                {
                  "name": 'Estatal',
                  "data": [2.7, 2.5]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 3', '2021-2022 Lugar 20'],
              "message": "No tuvo cambio",
              "semaforo": "#ffc000",
            },
            {
              "sub_tittle": "Educación Secundaria Abandono Escolar",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [4.4, 2.9]
                },
                {
                  "name": 'Estatal',
                  "data": [2.8, 2.6]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 4', '2021-2022 Lugar 15'],
              "message": "No tuvo cambio",
              "semaforo": "#ffc000",
            },
            {
              "sub_tittle": "Educación Secundaria Eficiencia Terminal",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [87.7, 91.4]
                },
                {
                  "name": 'Estatal',
                  "data": [91.8, 94.2]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 4', '2021-2022 Lugar 6'],
              "message": "6° Lugar nacional",
              "semaforo": "#ffc000",
              "note": "Creció 2.4 puntos porcentuales",
            },
          ]
        },
        {
          "tittle": "Media Superior",
          "charts": [
            {
              "sub_tittle": "Educación Media Superior Matrícula",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [132696, 137655, 140313, 143288, 147365, 143364, 137531]
                },
              ],
              "colors": ["#621132"],
              "categories": ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"],
              "message": "La matrícula se redujo en 9 mil 834 estudiantes",
              "semaforo": "#c00000",
              "note": "Entre el ciclo 2019-2020 y el 2021-2022 por la pandemia"
            },
            {
              "sub_tittle": "Educación Media Superior Cobertura",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [75, 72.9]
                },
                {
                  "name": 'Estatal',
                  "data": [83.4, 83.1]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 6', '2021-2022 Lugar 3'],
              "message": "3er Lugar nacional",
              "semaforo": "#ffc000",
              "note": "7 puntos porcentuales por arriba de la media nacional"
            },
            {
              "sub_tittle": "Educación Media Superior Absorción",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [105.7, 90.3]
                },
                {
                  "name": 'Estatal',
                  "data": [102.4, 90.5]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 22', '2021-2022 Lugar 18'],
              "message": "Disminuyó 11.9 puntos porcentuales",
              "semaforo": "#ffc000",
            },
            {
              "sub_tittle": "Educación Media Superior Reprobación",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [13.9, 12.2]
                },
                {
                  "name": 'Estatal',
                  "data": [15.6, 12.8]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 24', '2021-2022 Lugar 16'],
              "message": "Disminuyó 2.8 puntos porcentuales",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Educación Media Superior Abandono Escolar",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [15.5, 11.6]
                },
                {
                  "name": 'Estatal',
                  "data": [13.8, 14.6]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 20', '2021-2022 Lugar 21'],
              "message": "Aumentó 0.8 puntos porcentuales",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Educación Media Superior Eficiencia Terminal",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [65.6, 64.9]
                },
                {
                  "name": 'Estatal',
                  "data": [66, 63.7]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 20', '2021-2022 Lugar 21'],
              "message": "Disminuyó 2.3 puntos porcentuales",
              "semaforo": "#c00000",
            },
          ],
        },
        {
          "tittle": "Superior",
          "charts": [
            {
              "sub_tittle": "Educación Superior Matrícula",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [97429, 102017, 105959, 112035, 115714, 114880, 113962]
                },
              ],
              "colors": ["#621132"],
              "categories": ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"],
              "message": "La matrícula se redujo en 1 mil 752 estudiantes",
              "semaforo": "#c00000",
              "note": "Entre el ciclo 2019-2020 y el 2021-2022 por la pandemia",
            },
            {
              "sub_tittle": "Educación Preescolar Atención a 3 a 5 años",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [31, 34.5]
                },
                {
                  "name": 'Estatal',
                  "data": [35.9, 41.5]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 10', '2021-2022 Lugar 14'],
              "message": "Creció 5.6 puntos porcentuales",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Educación Superior Absorción",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [72.9, 68.1]
                },
                {
                  "name": 'Estatal',
                  "data": [84, 74.1]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 14', '2021-2022 Lugar 12'],
              "message": "Disminuyó 9.9 puntos porcentuales",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Educación Superior Abandono Escolar",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [7, 8.8]
                },
                {
                  "name": 'Estatal',
                  "data": [4.8, 8.5]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016 Lugar 11', '2021-2022 Lugar 14'],
              "message": "Aumentó 3.7 puntos porcentuales",
              "semaforo": "#ffc000",
            },
          ],
        },
        {
          "tittle": "INEGI 2020",
          "charts": [
            {
              "sub_tittle": "Población que asiste a la escuela Preescolar (3-5 años)",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [63.3]
                },
                {
                  "name": 'Estatal',
                  "data": [63.9]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['INEGI 2020 Lugar 13'],
              "message": "13° Lugar nacional",
              "semaforo": "#9bbb59",
            },
            {
              "sub_tittle": "Población que asiste a la escuela Primaria (6-11 años)",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [95.5]
                },
                {
                  "name": 'Estatal',
                  "data": [97.3]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['INEGI 2020 Lugar 1'],
              "message": "1° Lugar nacional",
              "semaforo": "#ffc000",
            },
            {
              "sub_tittle": "Población que asiste a la escuela Secundaria (12-14 años)",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [90.5]
                },
                {
                  "name": 'Estatal',
                  "data": [63.9]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['INEGI 2020 Lugar 2'],
              "message": "2° Lugar nacional",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Población que asiste a la escuela Media Superior y Superior (15-24 años)",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [45.3]
                },
                {
                  "name": 'Estatal',
                  "data": [49.1]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['INEGI 2020 Lugar 4'],
              "message": "4° Lugar nacional",
              "semaforo": "#c00000",
            },
          ],
        },
        {
          "tittle": "INEA, INEGI 2020",
          "charts": [
            {
              "sub_tittle": "Rezago educativo en población de 15 años y más",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [35, 29.6]
                },
                {
                  "name": 'Estatal',
                  "data": [35.5, 29.4]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2015-2016', '2021-2022 Lugar 20'],
              "message": "Disminuyó 5.4 puntos porcentuales",
              "semaforo": "#c00000",
            },
          ],
        },
        {
          "tittle": "CONEVAL",
          "charts": [
            {
              "sub_tittle": "Rezago educativo",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [18.5, 19.2]
                },
                {
                  "name": 'Estatal',
                  "data": [19.9, 18.9]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2016', '2020 Lugar 23'],
              "message": "Disminuyó 1 punto porcentual",
              "semaforo": "#c00000",
            },
          ],
        },
        {
          "tittle": "ICE 2021-2022 (IMCO)",
          "charts": [
            {
              "sub_tittle": "Grado de escolaridad En población de 25 años y más",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [9.5]
                },
                {
                  "name": 'Estatal',
                  "data": [8.6]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2020 Lugar 27'],
              "message": "0.9 puntos por debajo de la media nacional",
              "semaforo": "#c00000",
            },
            {
              "sub_tittle": "Cobertura educativa (Tasa bruta de escolarización en secundaria)",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [95.4]
                },
                {
                  "name": 'Estatal',
                  "data": [103]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2020 Lugar 2'],
              "message": "2° Lugar nacional 7.6 puntos por arriba de la media nacional",
              "semaforo": "#9bbb59",
            },
            {
              "sub_tittle": "Rendimiento académico",
              "series": [
                {
                  "name": 'Nacional',
                  "data": [16]
                },
                {
                  "name": 'Estatal',
                  "data": [23]
                }
              ],
              "colors": ["#bc955c", "#621132"],
              "categories": ['2020'],
              "message": "5° Lugar nacional 7 puntos por arriba de la media nacional",
              "semaforo": "#ffc000",
              "footer": "Porcentaje de alumnos en nivel de desempeño 3 y 4 en matemáticas en Planea."
            },
          ],
        },
      ]

      query.response.forEach((indicador) => {
        const {filtro_indicador_nacional_id} = indicador

        switch (filtro_indicador_nacional_id) {
          case 1:
            indicador_sep.push(indicador)
            break
          case 2:
            indicador_inegi.push(indicador)
            break
          case 3:
            indicador_coneval.push(indicador)
            break
          case 4:
            indicador_imco.push(indicador)
            break
        }
      })

      const indicadores_nacionales = [
        {
          "nombre_indicador": "SEP",
          "filtro_indicador_nacional_id": 1,
          "indicadores": indicador_sep
        },
        {
          "nombre_indicador": "INEGI 2022",
          "filtro_indicador_nacional_id": 2,
          "indicadores": indicador_inegi
        },
        {
          "nombre_indicador": "CONEVAL 2022",
          "filtro_indicador_nacional_id": 3,
          "indicadores": indicador_coneval
        },
        {
          "nombre_indicador": "IMCO 2021-2022",
          "filtro_indicador_nacional_id": 4,
          "indicadores": indicador_imco
        },
      ]

      const respuesta = {
        "indicador": indicadores_nacionales,
        "charts": indicadores_chart_nacionales
      }

      return response.status(200).json(message_success("Indicadores nacionales consultados exitosamente", respuesta));
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
  if (request.session.login || token_acceso === TOKEN_WEB) {
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

const consultar_indicadores_estatales = async (request, response) => {
  const {token_acceso} = request.body;

  const validacion_session = await validate_session(request, response, token_acceso)
  if (validacion_session.reload || validacion_session.redirect) return response.status(200).json(validacion_session);

  //Consulta query
  if (request.session.login || token_acceso === TOKEN_WEB) {
    const query = await pool_query(`SELECT indicador_estatal.*, filtro_indicador_estatal.filtro
                                          FROM indicador_estatal
                                                   JOIN filtro_indicador_estatal
                                                        on filtro_indicador_estatal.id_filtro_indicador_estatal = indicador_estatal.filtro_indicador_estatal_id;`, "", "Error, no se pudieron consultar indicadores estatales");

    if (query.success) {
      const indicador_educacion_cultura = []
      const indicador_institucional_desarrollo = []

      query.response.forEach((indicador) => {
        const {filtro_indicador_estatal_id} = indicador

        switch (filtro_indicador_estatal_id) {
          case 1:
            indicador_educacion_cultura.push(indicador)
            break
          case 2:
            indicador_institucional_desarrollo.push(indicador)
            break
        }
      })

      const indicadores_nacionales = [
        {
          "nombre_indicador": "Programa Sectorial De Educación Y Cultura 2020-2022",
          "filtro_indicador_estatal_id": 1,
          "indicadores": indicador_educacion_cultura
        },
        {
          "nombre_indicador": "Programa Institucional De Desarrollo Del Instituto Hidalguense De Educación",
          "filtro_indicador_estatal_id": 1,
          "indicadores": indicador_institucional_desarrollo
        },
      ]

      return response.status(200).json(message_success("Indicadores estatales consultados exitosamente", indicadores_nacionales));
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
  consultar_indicadores_institucionales,
  consultar_indicadores_estatales
}