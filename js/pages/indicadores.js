const indicadores = [
  {
    "name": "Internacionales",
    "id": 1,
    "end": true,
    "service": "consultar_indicadores_internacionales",
    "subsecretarias": [],
  },
  {
    "name": "Nacionales",
    "id": 2,
    "end": true,
    "subsecretarias": []
  },
  {
    "name": "Estatales",
    "id": 3,
    "end": true,
    "subsecretarias": []
  },
  {
    "name": "Institucionales",
    "id": 4,
    "end": false,
    "subsecretarias": [
      {
        "name": "Despacho",
        "id": 1,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Coordinación Ejecutiva",
            "id": 1,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Asuntos Jurídicos",
            "id": 2,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Comunicación Social",
            "id": 3,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Órgano Interno de Control",
            "id": 4,
            "end": true,
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Educación Básica",
        "id": 2,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Básica",
            "id": 1,
            "end": false,
            "niveles_educativos": [
              {
                "name": "Inicial",
                "end": true,
                "id": 1
              },
              {
                "name": "Preescolar",
                "end": true,
                "id": 2
              },
              {
                "name": "Primaria",
                "end": true,
                "id": 3
              },
              {
                "name": "Secundaria",
                "end": true,
                "id": 4
              },
            ]
          },
          {
            "name": "Desarrollo Curricular",
            "id": 2,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Fortalecimiento Educativo",
            "id": 3,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Formación Superior Docente",
            "id": 4,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Servicio Regionales",
            "id": 5,
            "end": true,
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Planeación",
        "id": 3,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Planeación",
            "id": 1,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Evaluación",
            "id": 2,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Estadística",
            "id": 3,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "USICAMM",
            "id": 4,
            "end": true,
            "niveles_educativos": []
          },
        ]
      },
      {
        "name": "Administración y Finanzas",
        "id": 4,
        "end": false,
        "direcciones_generales": [
          {
            "name": "Recursos Financieros",
            "id": 1,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Administración de Personal",
            "id": 2,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Recursos Materiales",
            "id": 3,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Tecnologías de la información",
            "id": 4,
            "end": true,
            "niveles_educativos": []
          },
          {
            "name": "Innovación y Calidad",
            "id": 5,
            "end": true,
            "niveles_educativos": []
          },
        ]
      }
    ]
  }
]
let indicadores_datatable = null

//Funciones
const pintar_tabla_indicadores = (tittle, type) => {
  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  indicadores_datatable = null;

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
  indicadores_datatable = $("#table_indicadores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
}

const notificacion_palabra = (tittle, text, message) => {
  return `<a href="#" onclick="notificacion_sweetalert('${tittle}','${message}')">${text}</a>`
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

  return `<i class="bi bi-circle-fill" style="color: ${(semaforo_nacional + semaforo_hidalgo) >= 5 ? "green" : (semaforo_nacional + semaforo_hidalgo) >= 2 ? "yellow" : "red"}"></i>`
}

const pintar_tabla_indicadores_internacionales = (tittle, type, metas_indicadores) => {
  notificacion_toastify("Tabla de indicadores internacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();

  $("#container_tittle_indicadores").append(`<h2>${type}: ${tittle}</h2>`);

  indicadores_datatable = null;

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

  metas_indicadores.forEach((meta_indicadores) => {
    const {meta_internacional} = meta_indicadores
    meta_indicadores.indicadores.forEach((indicador) => {
      const {indicador_mexico, nacional_porcentaje, hidalgo_porcentaje, posicion, ascendente, hidalgo_calculo, nacional_calculo} = indicador

      table += `<tr>
                <td style="text-align: left">${notificacion_palabra("Meta", `Meta ${meta_internacional.split(" ")[0]}`, meta_internacional)}</td>
                <td style="text-align: left">${indicador_mexico}</td>
                <td>${nacional_porcentaje}</td>
                <td>${hidalgo_porcentaje}</td>
                <td>${posicion}</td>
                <td>${calcular_semaforo_indicadores(posicion, ascendente, hidalgo_calculo, nacional_calculo)}</td>
              </tr>`;
    })
  })

  table += ` </tbody> 
            </table>`;

  $("#container_table_indicadores").append(table);

  //Datatable
  indicadores_datatable = $("#table_indicadores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
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
      btn_subsecretarias += `<button type="button" id="subsecretaria_${id}" data-type="subsecretaria" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id}" data-end="${end}" class="btn btn-primary control_subsecretarias">${name}</button>`
    })

    if (end === "true") {
      $("#menu_indicadores").removeClass("d-none")

      if (service && service !== "") {
        switch (service) {
          case "consultar_indicadores_internacionales":
            notificacion_toastify_carga()
            request_post(`/api/v1/indicadores/${service}`, {}).then((response) => {
              const {success, response: metas_indicadores} = response;
              if (success) pintar_tabla_indicadores_internacionales(indicadores[id_indicador - 1].name, "Indicador", metas_indicadores);
            })
            break
        }
      } else {
        pintar_tabla_indicadores(indicadores[id_indicador - 1].name, "Indicador")
      }
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
      const {name, id, end} = direccion_general
      btn_direcciones_generales += `<button type="button" id="direccion_general_${id}" data-type="direccion_general" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id_subsecretaria}" data-id-direccion-general="${id}" data-end="${end}" class="btn btn-primary control_direccion_general">${name}</button>`
    })

    if (end === "true") {
      $("#menu_indicadores").removeClass("d-none")
      pintar_tabla_indicadores(indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].name, "Subsecretaria")
    }

    $("#direccion_general").append(btn_direcciones_generales)
  }

  if (type === "direccion_general") {
    $(".control_direccion_general").removeClass("btn-success")

    $("#nivel_educativo").empty()

    $("#divider_niveles_educativos").addClass("d-none")

    if (indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - 1].niveles_educativos.length > 0) $("#divider_niveles_educativos").removeClass("d-none")

    indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - 1].niveles_educativos.forEach((nivel_educativo) => {
      const {name, id, end} = nivel_educativo
      btn_niveles_educativos += `<button type="button" id="nivel_educativo_${id}" data-type="nivel_educativo" data-id-indicador="${id_indicador}" data-id-subsecretaria="${id_subsecretaria}" data-id-direccion-general="${id_direccion_general}" data-id-nivel-educativo="${id}" data-end="${end}" class="btn btn-primary control_nivel_educativo">${name}</button>`
    })

    if (end === "true") {
      $("#menu_indicadores").removeClass("d-none")
      pintar_tabla_indicadores(indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - 1].name, "Dirección General")
    }

    $("#nivel_educativo").append(btn_niveles_educativos)
  }

  if (type === "nivel_educativo") {
    $(".control_nivel_educativo").removeClass("btn-success")

    if (end === "true") {
      $("#menu_indicadores").removeClass("d-none")
      pintar_tabla_indicadores(indicadores[id_indicador - 1].subsecretarias[id_subsecretaria - 1].direcciones_generales[id_direccion_general - 1].niveles_educativos[id_nivel_educativo - 1].name, "Nivel Educativo")
    }
  }

  $(`#${id}`).addClass('btn-success');
})
