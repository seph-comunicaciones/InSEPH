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
let value_indicadores = {
  "indicador": 0,
  "sub_secretaria": 0,
  "direccion_general": 0,
  "nivel_educativo": 0,
}

//Funciones
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

  return `<i class="bi bi-circle-fill" style="color: ${(semaforo_nacional + semaforo_hidalgo) >= 5 ? "green" : (semaforo_nacional + semaforo_hidalgo) >= 2 ? "yellow" : "red"}"></i><i style="color: transparent">${(semaforo_nacional + semaforo_hidalgo) >= 5 ? 1 : (semaforo_nacional + semaforo_hidalgo) >= 2 ? 2 : 3}</i>`
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

const pintar_chart_indicadores = (indicadores_chart_nacionales, id) => {
  $(`#${id}`).append(`<div class="buttons" id="menu_chart_indicadores_nacionales" style="display: flex; flex-wrap: wrap; justify-content: space-between;padding: 0.5rem;"></div>`)

  indicadores_chart_nacionales.forEach((indicador_chart) => {
    const {tittle, charts} = indicador_chart
    const id_tittle = tittle.toLowerCase().replaceAll(" ", "_").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "_")

    $(`#${id}`).append(`<h2 class="indicador_nacional_chart container_indicador_nacional_${id_tittle}">${tittle}</h2>`)
    $(`#menu_chart_indicadores_nacionales`).append(`<button id="indicador_nacional_chart_${id_tittle}" type="button" data-type="${id_tittle}" class="btn  btn-marron-seph control_chart_indicadores_nacionales">${tittle}</button>`)

    charts.forEach((chart) => {
      const {sub_tittle, series, categories, message, semaforo, note, colors, footer} = chart
      const id_sub_tittle = sub_tittle.toLowerCase().replaceAll(" ", "_").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "_")

      const id_chart = `chart_${id_tittle}_${id_sub_tittle}`

      const options = {
        colors: colors,
        series: series,
        chart: {
          type: 'bar',
          height: 300
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: sub_tittle
          }
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: val => `${val}`
          }
        }
      };

      $(`#${id}`).append(`<div class="indicador_nacional_chart container_indicador_nacional_${id_tittle}">
                            <div class="row" style="display: flex;align-items: center;justify-content: space-around;">
                              <div class="col-md-9 col-12" id="${id_chart}"></div>
                              <div class="col-md-3 col-12" style="display: flex;align-items: center;flex-direction: column;">
                                ${note ? `<div style="display: flex;"><p style="text-align: center;">${note}</p></div>` : ``}
                                <div style="display: flex;background-color: ${semaforo};border-radius: 50%;width: 150px;height: 150px;">
                                  <p style="text-align: center;margin: auto;color: white;font-size: 10px;">${message}</p>
                                </div>
                              </div>
                            </div>
                            ${footer ? `<div style="opacity: 0.5;"><p><em>${footer}</em></p></div>` : ``}
                            <hr>
                          </div>`)

      const new_chart = new ApexCharts(
        document.querySelector(`#${id_chart}`),
        options
      );

      new_chart.render();
    })
  })
}

const validar_navs_indicadores = () => {
  if ($("#container_chart_indicadores").children().length === 0) {
    $("#container_table_indicadores_tab").click()
    $("#container_chart_indicadores_tab").addClass("d-none")
  } else {
    $("#container_chart_indicadores_tab").click()
    $("#container_chart_indicadores_tab").removeClass("d-none")
  }
}

const pintar_indicador = (service, id_indicador, consumir) => {
  if (consumir) {
    notificacion_toastify_carga()
    $("#menu_indicadores").removeClass("d-none")
    request_post(`/api/v1/indicadores/${service}`, {}).then((response) => {
      const {success, response: {indicador, charts}} = response;

      if (success) {
        switch (service) {
          case "consultar_indicadores_internacionales":
            pintar_tabla_indicadores_internacionales(indicadores[id_indicador].name, "Indicador", indicador, charts);
            break
          case "consultar_indicadores_nacionales":
            pintar_tabla_indicadores_nacionales(indicadores[id_indicador].name, "Indicador", indicador, charts);
            break
          case "consultar_indicadores_estatales":
            pintar_tabla_indicadores_estatales(indicadores[id_indicador].name, "Indicador", indicador);
            break
        }
      }
    })
  }
}

const pintar_direccion_general = (service, id_indicador, id_sub_secretaria, id_direccion_general, direccion_general, consumir) => {
  if (consumir) {
    notificacion_toastify_carga()
    $("#menu_indicadores").removeClass("d-none")
    request_post(`/api/v1/indicadores/${service}`, {
      "subsecretaria": id_sub_secretaria + 1,
      "direccion_general": (direccion_general) + 1,
      "nivel_educativo": ""
    }).then((response) => {
      const {success, response: {indicador, charts}} = response;

      if (success) pintar_tabla_indicadores_institucionales(indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].name, "Dirección General", indicador)
    })
  }
}

const pintar_nivel_educativo = (service, id_indicador, id_sub_secretaria, id_direccion_general, id_nivel_educativo, direccion_general, consumir) => {
  if (consumir) {
    notificacion_toastify_carga()
    $("#menu_indicadores").removeClass("d-none")
    request_post(`/api/v1/indicadores/${service}`, {
      "subsecretaria": id_sub_secretaria + 1,
      "direccion_general": direccion_general + 1,
      "nivel_educativo": id_nivel_educativo + 1
    }).then((response) => {
      const {success, response: {indicador, charts}} = response;

      if (success) pintar_tabla_indicadores_institucionales(indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos[id_nivel_educativo].name, "Nivel Educativo", indicador)
    })
  }
}

const pintar_choice = (id) => {
  const choice_indicadores = document.querySelector(`#${id}`)
  if (choice_indicadores.classList.contains("multiple-remove")) {
    new Choices(choice_indicadores, {
      delimiter: ",",
      editItems: true,
      maxItemCount: -1,
      removeItemButton: true,
    });
  } else {
    new Choices(choice_indicadores);
  }
}

$("#menu_indicadores").on("click", ".control_chart_indicadores_nacionales", (event) => {
  const button = event.currentTarget
  const id = button.id
  const type = button.dataset.type

  $(".control_chart_indicadores_nacionales").removeClass("btn-cafe-seph")
  $(".control_chart_indicadores_nacionales").addClass("btn-marron-seph")
  $(`#${id}`).addClass('btn-cafe-seph');
  $(`#${id}`).removeClass('btn-marron-seph');

  $(`.indicador_nacional_chart`).addClass("d-none")
  $(`.container_indicador_nacional_${type}`).removeClass("d-none")
})

const pintar_tabla_indicadores_internacionales = (tittle, type, indicadores_internacionales, charts) => {
  notificacion_toastify("Tabla de indicadores internacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").empty();
  $("#container_chart_indicadores").removeClass("d-none");

  pintar_chart_indicadores(charts, "container_chart_indicadores")

  $("#indicador_nacional_chart_meta_4_2").click()

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  let table = `<table class="table" style="text-align: center" id="table_indicadores_internacionales">
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
  $("#table_indicadores_internacionales").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });

  validar_navs_indicadores()
}

const pintar_tabla_indicadores_nacionales = (tittle, type, indicadores_nacionales, charts) => {
  notificacion_toastify("Tabla de indicadores nacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").empty();
  $("#container_chart_indicadores").removeClass("d-none");

  pintar_chart_indicadores(charts, "container_chart_indicadores")

  $("#indicador_nacional_chart_global").click()

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  indicadores_nacionales.forEach((indicador_nacional) => {
    const {nombre_indicador, filtro_indicador_nacional_id, indicadores} = indicador_nacional

    let table = `<h3>Categoria: ${nombre_indicador}</h3>`

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
            </table>
            <hr>`;

    $("#container_table_indicadores").append(table);

    //Datatable
    $(`#table_indicadores_${nombre_indicador.replaceAll(" ", "_")}`).DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
    });
  })

  validar_navs_indicadores()
}

const pintar_tabla_indicadores_estatales = (tittle, type, indicadores_estatales) => {
  notificacion_toastify("Tabla de indicadores estatales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").empty();
  $("#container_chart_indicadores").addClass("d-none");

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2><hr>`);

  indicadores_estatales.forEach((indicador_estatal) => {
    const {nombre_indicador, indicadores} = indicador_estatal

    let table = `<h3>Categoria: ${nombre_indicador}</h3>`

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
            </table>  
            <hr>`;

    $("#container_table_indicadores").append(table);

    //Datatable
    $(`#table_indicadores_${nombre_indicador.replaceAll(" ", "_")}`).DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
    });
  })

  validar_navs_indicadores()
}

const pintar_tabla_indicadores_institucionales = (tittle, type, indicadores_institucionales) => {
  notificacion_toastify("Tabla de indicadores institucionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").empty();
  $("#container_chart_indicadores").addClass("d-none");

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  let table = `<table class="table" style="text-align: center" id="table_indicadores" data-table="true">
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
  validar_navs_indicadores()
}

$("#menu_indicadores").on("click", "#container_table_indicadores_tab", () => {
  const table = $("#table_indicadores")

  if (table.length === 1 && table.attr("data-table") === "true") {
    table.attr("data-table", "false")
    table.DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
      paging: false,
      info: false,
    })
  }
})

//Opciones de indicadores
request_get("/api/v1/usuarios/validar_session").then()

//Pintar indicadores
indicadores.forEach((indicador) => $("#indicadores_select").append(`<option value="${indicador.id - 1}">${indicador.name}</option>`))
// Estilo choice select
pintar_choice("indicadores_select")

$("#menu_indicadores").removeClass("d-none")
pintar_indicador(indicadores[$("#indicadores_select").val()].service, $("#indicadores_select").val(), true)

//Opciones de indicadores
const pintar_select_indicadores = (indicadores, id_select, id_div) => {
  let options = ""
  $(`#${id_div}`).empty().append(`<select id="${id_select}" class="choices form-select"></select>`)
  indicadores.forEach((indicador) => options += `<option value="${indicador.id - 1}">${indicador.name}</option>`)
  $(`#${id_select}`).empty().append(options)

  pintar_choice(id_select)
}

$("#indicadores_select").on("change", () => {
  $("#menu_indicadores").addClass("d-none")
  $("#sub_secretaria").addClass("d-none")
  $("#direccion_general").addClass("d-none")
  $("#nivel_educativo").addClass("d-none")

  value_indicadores.indicador = parseInt($("#indicadores_select").val())

  const {indicador: id_indicador} = value_indicadores
  const {end, service} = indicadores[id_indicador]

  pintar_indicador(service, id_indicador, end && service && service !== "")

  if (indicadores[id_indicador] &&
    indicadores[id_indicador].subsecretarias &&
    indicadores[id_indicador].subsecretarias.length > 0) {
    $("#sub_secretaria").removeClass("d-none")
    pintar_select_indicadores(indicadores[id_indicador].subsecretarias, "sub_secretaria_select", "sub_secretaria_div")

    /*
    Subsecretarias
    */
    value_indicadores.sub_secretaria = parseInt($("#sub_secretaria_select").val())
    $("#direccion_general").removeClass("d-none")
    pintar_select_indicadores(indicadores[id_indicador].subsecretarias[$("#sub_secretaria_select").val()].direcciones_generales, "direccion_general_select", "direccion_general_div")

    /*
    Direcciones generales
    */
    const {end, service, name} = indicadores[id_indicador].subsecretarias[0].direcciones_generales[0]
    pintar_direccion_general(service, id_indicador, 0, 0, 0, end && service && service !== "")

    $("#direccion_general_select").on("change", () => {
      $("#nivel_educativo").addClass("d-none")

      const dg = parseInt($("#direccion_general_select").val())

      value_indicadores.direccion_general = dg < 6 ? dg : dg < 18 ? dg - 6 : dg < 23 ? dg - 18 : dg - 23

      const {indicador: id_indicador, sub_secretaria: id_sub_secretaria, direccion_general: id_direccion_general} = value_indicadores
      const {end, service, name} = indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general]

      pintar_direccion_general(service, id_indicador, id_sub_secretaria, id_direccion_general, dg, end && service && service !== "")
    });


    $("#sub_secretaria_select").on("change", () => {
      $("#menu_indicadores").addClass("d-none")
      $("#direccion_general").addClass("d-none")
      $("#nivel_educativo").addClass("d-none")

      value_indicadores.sub_secretaria = parseInt($("#sub_secretaria_select").val())

      const {indicador: id_indicador, sub_secretaria: id_sub_secretaria} = value_indicadores
      const {end, service} = indicadores[id_indicador].subsecretarias[id_sub_secretaria]


      if (indicadores[id_indicador].subsecretarias &&
        indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales &&
        indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales.length > 0) {
        $("#direccion_general").removeClass("d-none")
        pintar_select_indicadores(indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales, "direccion_general_select", "direccion_general_div")

        /*
        Direcciones generales
        */
        const {end, service, name} = indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[0]
        pintar_direccion_general(service, id_indicador, id_sub_secretaria, 0, parseInt($("#direccion_general_select").val()), end && service && service !== "")

        $("#direccion_general_select").on("change", () => {
          $("#menu_indicadores").addClass("d-none")
          $("#nivel_educativo").addClass("d-none")

          const dg = parseInt($("#direccion_general_select").val())

          value_indicadores.direccion_general = dg < 6 ? dg : dg < 18 ? dg - 6 : dg < 23 ? dg - 18 : dg - 23

          const {indicador: id_indicador, sub_secretaria: id_sub_secretaria, direccion_general: id_direccion_general} = value_indicadores
          const {end, service, name} = indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general]

          pintar_direccion_general(service, id_indicador, id_sub_secretaria, id_direccion_general, dg, end && service && service !== "")

          if (indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales &&
            indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos &&
            indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos.length > 0) {
            $("#nivel_educativo").removeClass("d-none")
            pintar_select_indicadores(indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos, "nivel_educativo_select", "nivel_educativo_div")

            /*
            Niveles educativos
            */
            const {end, service, name} = indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos[0]
            pintar_nivel_educativo(service, id_indicador, id_sub_secretaria, id_direccion_general, 0, parseInt($("#direccion_general_select").val()), end && service && service !== "")

            $("#nivel_educativo_select").on("change", () => {
              $("#menu_indicadores").addClass("d-none")

              value_indicadores.nivel_educativo = parseInt($("#nivel_educativo_select").val())

              const {indicador: id_indicador, sub_secretaria: id_sub_secretaria, direccion_general: id_direccion_general, nivel_educativo: id_nivel_educativo} = value_indicadores
              const {end, service, name} = indicadores[id_indicador].subsecretarias[id_sub_secretaria].direcciones_generales[id_direccion_general].niveles_educativos[id_nivel_educativo]

              pintar_nivel_educativo(service, id_indicador, id_sub_secretaria, id_direccion_general, id_nivel_educativo, parseInt($("#direccion_general_select").val()), end && service && service !== "")
            });
          }
        });
      }
    });
  }
});
