const indicadores = [
  {
    "name": "Internacional",
    "id": 1,
    "end": true,
    "service": "consultar_indicadores_internacionales",
    "subsecretarias": [],
  },
  {
    "name": "Nacional",
    "id": 2,
    "end": true,
    "service": "consultar_indicadores_nacionales",
    "subsecretarias": []
  },
  {
    "name": "Estatal",
    "id": 3,
    "end": true,
    "service": "consultar_indicadores_estatales",
    "subsecretarias": []
  },
  {
    "name": "Institucional",
    "id": 4,
    "end": false,
    "subsecretarias": [
      {
        "name": "Despacho De La SEPH",
        "id": 1,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Coordinación Ejecutiva",
            "id": 1,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Asuntos Jurídicos",
            "id": 2,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Comunicación Social",
            "id": 3,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Técnica",
            "id": 4,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Centro Estatal de Lenguas y Culturas Indígenas",
            "id": 5,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Órgano Interno de Control",
            "id": 6,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Subsecretaría De Educación Básica",
        "id": 2,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Subsecretaría de Educación Básica (Coordinación general)",
            "id": 7,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Educación Básica",
            "id": 8,
            "end": false,
            "niveles_educativos": [
              {
                "name": "Especial",
                "id": 1,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Inicial",
                "id": 2,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Preescolar",
                "id": 3,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Primaria",
                "id": 4,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Indígena",
                "id": 5,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Secundaria General",
                "id": 6,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Secundaria Técnica",
                "id": 7,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "Telesecundaria",
                "id": 8,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
              {
                "name": "SubFísica",
                "id": 9,
                "end": true,
                "service": "consultar_indicadores_institucionales",
              },
            ]
          },
          {
            "name": "Desarrollo Curricular",
            "id": 9,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Fortalecimiento Educativo",
            "id": 10,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Servicios Regionales",
            "id": 11,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Formación y Superación Docente",
            "id": 12,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Centro Regional de Educación Normal 'Benito Juárez'",
            "id": 13,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Escuela Normal de las Huastecas",
            "id": 14,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Escuela Normal Sierra Hidalguense",
            "id": 15,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Escuela Normal Valle del Mezquital",
            "id": 16,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Escuela Normal Superior Pública del Estado de Hidalgo",
            "id": 17,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Universidad Pedagógica Nacional-Hidalgo",
            "id": 18,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Subsecretaría De Planeación Y Evaluación",
        "id": 3,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Subsecretaría de Planeación y Evaluación (Coordinación General)",
            "id": 19,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Planeación",
            "id": 20,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Evaluación",
            "id": 21,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Registro y Estadística",
            "id": 22,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Unidad Estatal del Sistema para la Carrera de las Maestras y los Maestros.",
            "id": 23,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Subsecretaría De Administración Y Finanzas",
        "id": 4,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Subsecretaría de Administración y Finanzas (Coordinación General)",
            "id": 24,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Recursos Financieros",
            "id": 25,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Recursos Humanos",
            "id": 26,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Recursos Materiales y Servicios",
            "id": 27,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Innovación, Calidad y Organización",
            "id": 28,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
          {
            "name": "Tecnologías de la Información",
            "id": 29,
            "end": true,
            "service": "consultar_indicadores_institucionales",
            "niveles_educativos": []
          },
        ]
      }
    ]
  }
]
const glosario_SEP = [
  {
    "word": "Absorción",
    "definition": "Porcentaje de alumnos egresados de un ciclo escolar, en un determinado nivel educativo, que se matriculan al siguiente nivel sin interrumpir sus estudios."
  },
  {
    "word": "Abandono-Escolar",
    "definition": "Porcentaje de alumnos que dejan la escuela de un ciclo escolar a otro."
  },
  {
    "word": "Atención-a-3-a-5-años",
    "definition": "Matrícula de entre 3 y 5 años respecto de la población de la misma edad."
  },
  {
    "word": "Eficiencia-del-Sistema-Educativo",
    "definition": "Porcentaje de alumnos que lograron terminar estudios superiores en un año determinado, de cada 100 estudiantes que iniciaron su educación primaria, 16 años antes."
  },
  {
    "word": "Cobertura",
    "definition": "Número total de alumnos en un nivel educativo al inicio del ciclo escolar, por cada cien del grupo de población con la edad reglamentaria para cursar ese nivel. También conocida como Tasa bruta de escolarización."
  },
  {
    "word": "Eficiencia-Terminal",
    "definition": "Número de alumnos que egresan de un determinado nivel educativo en un ciclo escolar, por cada cien alumnos de la cohorte inicial del mismo nivel."
  },
  {
    "word": "Reprobación",
    "definition": "Número de alumnos que no ha obtenido los conocimientos establecidos en los planes y programas de estudio de cualquier grado o curso al final del ciclo escolar, por cada 100 alumnos matriculados."
  },
]
const glosario_INEGI = [
  {
    "word": "Analfabetismo",
    "definition": "Porcentaje de personas de 15 años y más que no son capaces de leer ni escribir."
  },
  {
    "word": "Población-que-asiste-a-la-escuela",
    "definition": "Número de niños en el grupo poblacional analizado que asisten a la escuela, por cada cien en el mismo grupo."
  },
  {
    "word": "Grado promedio-de-escolaridad",
    "definition": "Número promedio de grados escolares aprobados por la población de 15 años y más. Es el nivel promedio de instrucción de un estado o país."
  },
  {
    "word": "Rezago-educativo",
    "definition": "Población de: (1) 3 a 21 años que no cuenta con educación obligatoria y no asiste a la escuela; (2) 21 años o más que no ha terminado el EMS; (3) 16 años o más que no completó la primaria o secundaria."
  },
]
const glosario_CONEVAL = [
  {
    "word": "Rezago-educativo",
    "definition": "Porcentaje de la población de 15 años y más que no ha logrado concluir la educación básica."
  },
]
const glosario_IMCO = [
  {
    "word": "Grado-promedio-de-escolaridad",
    "definition": "Número promedio de grados escolares aprobados por la población de 25 años y más."
  },
  {
    "word": "Cobertura-Educativa-de-educación-secundaria",
    "definition": "Número total de alumnos en secundaria al inicio del ciclo escolar, por cada cien del grupo de población con la edad reglamentaria para cursar ese nivel. También conocida como Tasa bruta de escolarización."
  },
  {
    "word": "Rendimiento-académico",
    "definition": "Porcentaje de alumnos en nivel de desempeño 3 y 4 en matemáticas, en la prueba Planea."
  },
]

//Funciones
const pintar_tabla_indicadores = (tittle, type) => {
  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  let table = `<table class="table" style="text-align: center" id="table_indicadores">
                <thead>
                  <tr>
                    <th style="text-align: center">Nombre</th>
                  </tr>
                </thead>
                <tbody> `;


  table += ` </tbody> 
            </table>`;

  $("#container_table_indicadores").append(table);

  //Datatable
  $("#table_indicadores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
}

const notificacion_palabra = (tittle, text, message) => {
  return `<a href="#" onclick="notificacion_sweetalert('${tittle}','${message}')">${text}</a>`
}

const agregar_glosario = (oracion, glosario) => {
  let oracion_glosario = oracion.replaceAll(" ", "-")

  glosario.forEach((palabra_definicion) => {
    const {word, definition} = palabra_definicion

    if (oracion_glosario.includes(word)) {
      oracion_glosario = oracion_glosario.replaceAll(word, `${notificacion_palabra("Glosario", word.replaceAll("-", " "), definition)}`)
    }
  })

  return oracion_glosario.replaceAll("-", " ");
}

const agregar_separacion = (textos) => {
  const textos_split = textos.split("\n");
  let texto_separado = ""

  textos_split.forEach((texto) => texto_separado += `<p style="margin: auto;">${texto}</p>`)

  return texto_separado
}

const mostrar_componentes = (id_indicador_componente, nivel) => {
  return `<label style="text-decoration: underline; color: royalblue; cursor: pointer;" onclick="mostrar_actividades(${id_indicador_componente})">${nivel}</label>`
}

const calcular_semaforo_indicadores = (posicion, ascendente, valor_hidalgo, valor_nacional) => {
  let semaforo_nacional = 0, semaforo_hidalgo = 0

  if (posicion <= 5 || valor_nacional === 100) {
    semaforo_nacional = 3
  } else if (posicion <= 10) {
    semaforo_nacional = 2
  } else if (posicion <= 15) {
    semaforo_nacional = 1
  }

  if (ascendente) {
    if (valor_hidalgo === 100) {
      semaforo_hidalgo = 3
    } else if (valor_hidalgo >= 85) {
      semaforo_hidalgo = 2
    } else if (valor_hidalgo >= 70) {
      semaforo_hidalgo = 1
    }
  } else {
    if (valor_hidalgo === 0) {
      semaforo_hidalgo = 3
    } else if (valor_hidalgo <= 5) {
      semaforo_hidalgo = 2
    } else if (valor_hidalgo <= 10) {
      semaforo_hidalgo = 1
    }
  }

  return `<i class="bi bi-circle-fill" style="color: ${(semaforo_nacional + semaforo_hidalgo) >= 5 ? "green" : (semaforo_nacional + semaforo_hidalgo) >= 2 ? "yellow" : "red"}"></i><i style="color: transparent">${semaforo_nacional + semaforo_hidalgo}</i>`
}

const calcular_semaforo_indicadores_estatales = (cumplimiento) => {
  return `<i class="bi bi-circle-fill" style="color: ${(cumplimiento) >= 85 ? "green" : (cumplimiento) >= 65 ? "yellow" : "red"}"></i><i style="color: transparent">${(cumplimiento) >= 85 ? 2 : (cumplimiento) >= 65 ? 3 : 4}</i>`
}

const calcular_semaforo_indicadores_institucionales = (avance, meta_programada) => {
  return `<i class="bi bi-circle-fill" style="color: ${(avance) >= 120 ? "purple" : (avance) >= 85 || meta_programada === 0 ? "green" : (avance) >= 65 ? "yellow" : "red"}"></i> ${avance >= 120 ? `<i style="color: orange" class="bi bi-exclamation-diamond" title="Meta subestimada"></i>` : ``}<i style="color: transparent">${(avance) >= 120 ? 1 : (avance) >= 85 || meta_programada === 0 ? 2 : (avance) >= 65 ? 3 : 4}</i>`
}

const mostrar_actividades = (id_indicador_institucional) => {
  $(".actividad_indicador_institucional").addClass("d-none")
  $(`.column_actividad`).removeClass("d-none")
  $(`.actividad_indicador_institucional_${id_indicador_institucional}`).removeClass("d-none")
}

const pintar_tabla_indicadores_internacionales = (tittle, type, indicadores_internacionales) => {
  notificacion_toastify("Tabla de indicadores internacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  let table = `<table class="table" style="text-align: center" id="table_indicadores">
                <thead>
                  <tr>
                    <th style="text-align: center">Meta</th>
                    <th style="text-align: center">Indicador México</th>
                    <th style="text-align: center">% Nacional</th>
                    <th style="text-align: center">% Hidalgo</th>
                    <th style="text-align: center">% Posición</th>
                    <th style="text-align: center">Semáforo</th>
                  </tr>
                </thead>
                <tbody> `;

  indicadores_internacionales.forEach((indicador_internacional) => {
    const {meta_internacional, indicador_mexico, nacional_porcentaje, hidalgo_porcentaje, posicion, ascendente, hidalgo_calculo, nacional_calculo} = indicador_internacional

    table += `<tr>
                <td style="text-align: left">${notificacion_palabra("Meta", `Meta ${meta_internacional.split(" ")[0]}`, meta_internacional)}</td>
                <td style="text-align: left">${indicador_mexico}</td>
                <td>${agregar_separacion(nacional_porcentaje)}</td>
                <td>${agregar_separacion(hidalgo_porcentaje)}</td>
                <td>${posicion}</td>
                <td>${calcular_semaforo_indicadores(posicion, ascendente, hidalgo_calculo, nacional_calculo)}</td>
              </tr>`;
  })

  table += ` </tbody> 
            </table>`;

  $("#container_table_indicadores").append(table);

  //Datatable
  $("#table_indicadores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
}

const pintar_tabla_indicadores_nacionales = (tittle, type, indicadores_nacionales) => {
  notificacion_toastify("Tabla de indicadores nacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  indicadores_nacionales.forEach((indicador_nacional) => {
    const {nombre_indicador, filtro_indicador_nacional_id, indicadores} = indicador_nacional

    let table = `<hr><h3>Categoria: ${nombre_indicador}</h3>`

    table += `<table class="table" style="text-align: center" id="table_indicadores_${nombre_indicador.replaceAll(" ", "_")}"><thead><tr>`

    if (nombre_indicador === "SEP") {
      table += `<th style="text-align: center">Nivel Educativo</th>`
    }

    table += `<th style="text-align: center">Indicador</th>
                     <th style="text-align: center">% Nacional</th>
                    <th style="text-align: center">% Hidalgo</th>
                    <th style="text-align: center">% Posición</th>
                    <th style="text-align: center">Semáforo</th>
                  </tr>
                </thead>
                <tbody>`;

    indicadores.forEach((indicador) => {
      const {indicador_nacional, nacional_porcentaje, hidalgo_porcentaje, posicion, ascendente, categoria_indicador_nacional} = indicador

      switch (filtro_indicador_nacional_id) {
        case 1:
          table += `<tr><td style="text-align: left">${categoria_indicador_nacional}</td><td style="text-align: left">${agregar_glosario(indicador_nacional, glosario_SEP)}</td>`
          break
        case 2:
          table += `<tr><td style="text-align: left">${agregar_glosario(indicador_nacional, glosario_INEGI)}</td>`;
          break
        case 3:
          table += `<tr><td style="text-align: left">${agregar_glosario(indicador_nacional, glosario_CONEVAL)}</td>`;
          break
        case 4:
          table += `<tr><td style="text-align: left">${agregar_glosario(indicador_nacional, glosario_IMCO)}</td>`;
          break
      }

      table += ` <td>${nacional_porcentaje}</td>
                <td>${hidalgo_porcentaje}</td>
                <td>${posicion}</td>
                <td>${calcular_semaforo_indicadores(posicion, ascendente, hidalgo_porcentaje, nacional_porcentaje)}</td>
              </tr>`
    })

    table += ` </tbody> 
            </table>`;

    $("#container_table_indicadores").append(table);

    //Datatable
    $(`#table_indicadores_${nombre_indicador.replaceAll(" ", "_")}`).DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
    });
  })
}

const pintar_tabla_indicadores_estatales = (tittle, type, indicadores_estatales) => {
  notificacion_toastify("Tabla de indicadores nacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  indicadores_estatales.forEach((indicador_estatal) => {
    const {nombre_indicador, indicadores} = indicador_estatal

    let table = `<hr><h3>Categoria: ${nombre_indicador}</h3>`

    table += `<table class="table" style="text-align: center" id="table_indicadores_${nombre_indicador.replaceAll(" ", "_")}"><thead><tr>`

    table += `<th style="text-align: center">No.</th>
                <th style="text-align: center">Indicador</th>
                     <th style="text-align: center">Meta</th>
                    <th style="text-align: center">Avance</th>
                    <th style="text-align: center">Cumplimiento</th>
                    <th style="text-align: center">Semáforo</th>
                  </tr>
                </thead>
                <tbody>`;

    indicadores.forEach((indicador) => {
      const {indicador_estatal, meta, avance, cumplimiento, No} = indicador

      table += `<tr>
                <td>${No}</td> 
                <td style="text-align: left">${indicador_estatal}</td> 
                <td>${meta}</td>
                <td>${avance}</td>
                <td>${cumplimiento}</td>
                <td>${calcular_semaforo_indicadores_estatales(cumplimiento)}</td>
              </tr>`
    })

    table += ` </tbody> 
            </table>`;

    $("#container_table_indicadores").append(table);

    //Datatable
    $(`#table_indicadores_${nombre_indicador.replaceAll(" ", "_")}`).DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
    });
  })
}

const pintar_tabla_indicadores_institucionales = (tittle, type, indicadores_institucionales) => {
  notificacion_toastify("Tabla de indicadores institucionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  let table = `<table class="table" style="text-align: center" id="table_indicadores">
                <thead>
                  <tr>
                    <th style="text-align: center">Componente</th>
                    <th class="d-none column_actividad" style="text-align: center">Actividad</th>
                    <th style="text-align: center">Resumen</th>
                    <th style="text-align: center">Indicador</th>
                    <th style="text-align: center">Frecuencia</th>
                    <th style="text-align: center">Meta Programada</th>
                    <th style="text-align: center">Meta Alcanzada</th>
                    <th style="text-align: center">Avance</th>
                    <th style="text-align: center">Semáforo</th>
                  </tr>
                </thead>
                <tbody> `;

  let id_indicador_componente = 0

  indicadores_institucionales.forEach((indicador_institucional) => {
    const {id_indicador_institucional, nivel, resumen, indicador, frecuencia, meta_programada, meta_alcanzada, avance, componente} = indicador_institucional

    id_indicador_componente = !componente ? id_indicador_componente : id_indicador_institucional;

    table += `<tr class="${!componente ? `d-none actividad_indicador_institucional actividad_indicador_institucional_${id_indicador_componente}` : "componente_indicador_institucional"}">
                <td>${!componente ? `<p style="color: transparent; margin: auto">${nivel}</p>` : `${mostrar_componentes(id_indicador_componente, nivel)}`}</td>
                <td class="d-none column_actividad">${!componente ? `${nivel}` : `<p style="margin: auto">${nivel}</p>`}</td>
                <td style="text-align: left">${resumen}</td>
                <td style="text-align: left">${indicador}</td>
                <td>${frecuencia}</td>
                <td>${meta_programada}</td>
                <td>${meta_alcanzada}</td>
                <td>${avance}</td>
                <td>${calcular_semaforo_indicadores_institucionales(avance, meta_programada)}</td>
              </tr>`;
  })

  table += ` </tbody> 
            </table>`;

  $("#container_table_indicadores").append(table);

  //Datatable
  $("#table_indicadores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
    paging: false,
  });
}

//Opciones indicadores
indicadores.forEach((indicador) => {
  const {name, id, end, service} = indicador

  $("#indicadores").append(`<button type="button" id="indicador_${id}" data-type="indicador" data-id-indicador="${id}" data-end="${end}" data-service="${service ? service : ""}" class="btn btn-primary control_indicadores">${name}</button>`)
})

$("#app").on("click", ".control_indicadores, .control_subsecretarias, .control_direccion_general, .control_nivel_educativo", (event) => {
  const button = event.currentTarget
  const id = button.id
  const type = button.dataset.type
  const end = button.dataset.end ? button.dataset.end : "false"
  const service = button.dataset.service ? button.dataset.service : ""
  const id_indicador = button.dataset.idIndicador
  const id_subsecretaria = button.dataset.idSubsecretaria
  const id_direccion_general = button.dataset.idDireccionGeneral
  const id_nivel_educativo = button.dataset.idNivelEducativo

  let id_direccion_general_indicador;
  id_direccion_general_indicador = id_direccion_general > 23 ? 24 : id_direccion_general_indicador = id_direccion_general > 18 ? 19 : id_direccion_general_indicador = id_direccion_general > 6 ? 7 : 1;

  let btn_subsecretarias = ``
  let btn_direcciones_generales = ``
  let btn_niveles_educativos = ``

  $("#menu_indicadores").addClass("d-none")

  if (type === "indicador") {
    $(".control_indicadores").removeClass("btn-success")

    $("#subsecretaria").empty()
    $("#direccion_general").empty()
    $("#nivel_educativo").empty()

    $("#divider_subsecretarias").addClass("d-none")
    $("#divider_direcciones_generales").addClass("d-none")
    $("#divider_niveles_educativos").addClass("d-none")

    if (indicadores[id_indicador - 1].subsecretarias.length > 0) $("#divider_subsecretarias").removeClass("d-none")

    indicadores[id_indicador - 1].subsecretarias.forEach((subsecretaria) => {
      const {name, id, end} = subsecretaria
      btn_subsecretarias += `<button type="button" id="subsecretaria_${id}" data-type="subsecretaria" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id}" data-end="${end}"  class="btn btn-primary control_subsecretarias">${name}</button>`
    })

    if (end === "true" && service && service !== "") {
      $("#menu_indicadores").removeClass("d-none")

      notificacion_toastify_carga()
      request_post(`/api/v1/indicadores/${service}`, {}).then((response) => {
        const {success, response: indicador} = response;

        if (success) {
          switch (service) {
            case "consultar_indicadores_internacionales":
              pintar_tabla_indicadores_internacionales(indicadores[id_indicador - 1].name, "Indicador", indicador);
              break
            case "consultar_indicadores_nacionales":
              pintar_tabla_indicadores_nacionales(indicadores[id_indicador - 1].name, "Indicador", indicador);
              break
            case "consultar_indicadores_estatales":
              pintar_tabla_indicadores_estatales(indicadores[id_indicador - 1].name, "Indicador", indicador);
              break
          }
        }
      })
    }

    $("#subsecretaria").append(btn_subsecretarias)
  }

  if (type === "subsecretaria") {
    $(".control_subsecretarias").removeClass("btn-success")

    $("#direccion_general").empty()
    $("#nivel_educativo").empty()

    $("#divider_direcciones_generales").addClass("d-none")
    $("#divider_niveles_educativos").addClass("d-none")

    if (indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales.length > 0) $("#divider_direcciones_generales").removeClass("d-none")

    indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales.forEach((direccion_general) => {
      const {name, id, end, service} = direccion_general
      btn_direcciones_generales += `<button type="button" id="direccion_general_${id}" data-type="direccion_general" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id_subsecretaria}" data-id-direccion-general="${id}" data-end="${end}" data-service="${service ? service : ""}" class="btn btn-primary control_direccion_general">${name}</button>`
    })

    $("#direccion_general").append(btn_direcciones_generales)
  }

  if (type === "direccion_general") {
    $(".control_direccion_general").removeClass("btn-success")

    $("#nivel_educativo").empty()

    $("#divider_niveles_educativos").addClass("d-none")

    if (indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - id_direccion_general_indicador].niveles_educativos.length > 0) $("#divider_niveles_educativos").removeClass("d-none")

    indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - id_direccion_general_indicador].niveles_educativos.forEach((nivel_educativo) => {
      const {name, id, end, service} = nivel_educativo
      btn_niveles_educativos += `<button type="button" id="nivel_educativo_${id}" data-type="nivel_educativo" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id_subsecretaria}" data-id-direccion-general="${id_direccion_general}" data-id-nivel-educativo="${id}" data-end="${end}" data-service="${service ? service : ""}" class="btn btn-primary control_nivel_educativo">${name}</button>`
    })

    if (end === "true" && service && service !== "") {
      $("#menu_indicadores").removeClass("d-none")

      notificacion_toastify_carga()
      request_post(`/api/v1/indicadores/${service}`, {
        "subsecretaria": id_subsecretaria,
        "direccion_general": id_direccion_general,
        "nivel_educativo": ""
      }).then((response) => {
        const {success, response: indicador} = response;

        if (success) pintar_tabla_indicadores_institucionales(indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - id_direccion_general_indicador].name, "Dirección General", indicador)
      })
    }

    $("#nivel_educativo").append(btn_niveles_educativos)
  }

  if (type === "nivel_educativo") {
    $(".control_nivel_educativo").removeClass("btn-success")

    if (end === "true" && service && service !== "") {
      $("#menu_indicadores").removeClass("d-none")

      notificacion_toastify_carga()
      request_post(`/api/v1/indicadores/${service}`, {
        "subsecretaria": id_subsecretaria,
        "direccion_general": id_direccion_general,
        "nivel_educativo": id_nivel_educativo
      }).then((response) => {
        const {success, response: indicador} = response;

        if (success) pintar_tabla_indicadores_institucionales(indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - id_direccion_general_indicador].niveles_educativos[id_nivel_educativo - 1].name, "Nivel Educativo", indicador)
      })
    }
  }

  $(`#${id}`).addClass('btn-success');
})
