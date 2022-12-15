let rol = false
let usuario = 0

//Funciones
const pintar_alumnos = (alumnos_hombres, alumnos_mujeres, alumnos_total) => {
  $("#dashboard_chart_alumnos").empty()

  let options_alumnos = {
    annotations: {
      position: "back",
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "bar",
      height: 300,
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {},
    series: [
      {
        name: "Alumnos",
        data: [alumnos_hombres ? alumnos_hombres : 0, alumnos_mujeres ? alumnos_mujeres : 0, alumnos_total ? alumnos_total : 0],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        "Alumnos total (hombres)	",
        "Alumnos total (mujeres)	",
        "Alumnos total	",
      ],
    },
  };

  let chart_alumnos = new ApexCharts(
    document.querySelector("#dashboard_chart_alumnos"),
    options_alumnos
  );

  chart_alumnos.render();
}

const pintar_docentes = (docentes_hombres, docentes_mujeres, docentes_total) => {
  $("#dashboard_chart_docentes").empty()

  let options_docentes = {
    annotations: {
      position: "back",
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "bar",
      height: 300,
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {},
    series: [
      {
        name: "Docentes",
        data: [docentes_hombres ? docentes_hombres : 0, docentes_mujeres ? docentes_mujeres : 0, docentes_total ? docentes_total : 0],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        "Docentes total (hombres)	",
        "Docentes total (mujeres)	",
        "Docentes total	",
      ],
    },
  };
  let chart_docentes = new ApexCharts(
    document.querySelector("#dashboard_chart_docentes"),
    options_docentes
  );

  chart_docentes.render();
}

const pintar_aulas = (aulas_uso, aulas_existentes) => {
  $("#dashboard_chart_aulas").empty()

  let options_aulas = {
    annotations: {
      position: "back",
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "bar",
      height: 300,
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {},
    series: [
      {
        name: "Aulas",
        data: [aulas_uso ? aulas_uso : 0, aulas_existentes ? aulas_existentes : 0],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: ["Aulas en uso", "Aulas existentes"],
    },
  };
  let chart_aulas = new ApexCharts(
    document.querySelector("#dashboard_chart_aulas"),
    options_aulas
  );

  chart_aulas.render();
}

const pintar_niveles = (SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS) => {
  $("#dashboard_chart_niveles").empty()

  let options_niveles = {
    annotations: {
      position: "back",
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "bar",
      height: 300,
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {},
    series: [
      {
        name: "Niveles educativos",
        data: [SIN_DEFINIR ? SIN_DEFINIR : 0, INICIAL ? INICIAL : 0, BASICA ? BASICA : 0, MEDIA_SUPERIOR ? MEDIA_SUPERIOR : 0, SUPERIOR ? SUPERIOR : 0, CAPACITACION ? CAPACITACION : 0, ESPECIAL ? ESPECIAL : 0, OTROS ? OTROS : 0,],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        "SIN_DEFINIR",
        "INICIAL",
        "BÁSICA",
        "MEDIA_SUPERIOR",
        "SUPERIOR",
        "CAPACITACIÓN",
        "ESPECIAL",
        "OTROS",
      ],
    },
  };
  let chart_niveles = new ApexCharts(
    document.querySelector("#dashboard_chart_niveles"),
    options_niveles
  );

  chart_niveles.render();
}

const pintar_select_menu_municipios = (municipios) => {
  $("#bashboard_select_municipio").empty()
  $("#bashboard_select_municipio").empty();

  let options_select = `<option value="">Elige una opción</option>`;
  municipios.forEach((municipio) => (options_select += `<option value="${municipio.id_municipio}">${municipio.nom_municipio}</option>`));

  $("#bashboard_select_municipio").append(options_select);
};

const pintar_tabla_alumnos_docente_aulas = (alumnos_hombres, alumnos_mujeres, alumnos_total, docentes_hombres, docentes_mujeres, docentes_total, aulas_uso, aulas_existentes) => {
  $("#container_tabla_alumnos_docentes_aulas").empty()
  $("#container_tabla_alumnos_docentes_aulas").append(`<table class="table mb-0">
                      <thead class="thead-dark">
                      <tr>
                        <th>Alumnos total (hombres)</th>
                        <th>Alumnos total (mujeres)</th>
                        <th>Alumnos total</th>
                        <th>Docentes total (hombres)</th>
                        <th>Docentes total (mujeres)</th>
                        <th>Docentes total</th>
                        <th>Aulas en uso</th>
                        <th>Aulas existentes</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${alumnos_hombres ? alumnos_hombres : 0}</td>
                        <td>${alumnos_mujeres ? alumnos_mujeres : 0}</td>
                        <td>${alumnos_total ? alumnos_total : 0}</td>
                        <td>${docentes_hombres ? docentes_hombres : 0}</td>
                        <td>${docentes_mujeres ? docentes_mujeres : 0}</td>
                        <td>${docentes_total ? docentes_total : 0}</td>
                        <td>${aulas_uso ? aulas_uso : 0}</td>
                        <td>${aulas_existentes ? aulas_existentes : 0}</td>
                      </tr>
                      </tbody>
                    </table>`)
}

const pintar_tabla_niveles = (SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS) => {
  $("#container_tabla_niveles").empty()
  $("#container_tabla_niveles").append(`<table class="table mb-0">
                      <thead class="thead-dark">
                      <tr>
                        <th>SIN DEFINIR</th>
                        <th>INICIAL</th>
                        <th>BÁSICA</th>
                        <th>MEDIA SUPERIOR</th>
                        <th>SUPERIOR</th>
                        <th>CAPACITACIÓN</th>
                        <th>ESPECIAL</th>
                        <th>OTROS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${SIN_DEFINIR ? SIN_DEFINIR : 0}</td>
                        <td>${INICIAL ? INICIAL : 0}</td>
                        <td>${BASICA ? BASICA : 0}</td>
                        <td>${MEDIA_SUPERIOR ? MEDIA_SUPERIOR : 0}</td>
                        <td>${SUPERIOR ? SUPERIOR : 0}</td>
                        <td>${CAPACITACION ? CAPACITACION : 0}</td>
                        <td>${ESPECIAL ? ESPECIAL : 0}</td>
                        <td>${OTROS ? OTROS : 0}</td>
                      </tr>
                      </tbody>
                    </table>`)
}

const pintar_dashboard = () => {
  request_post("/api/v1/dashboard/consultar_datos_dashboard", {
    "municipio_id": $("#bashboard_select_municipio").val()
  }).then((response) => {
    const {success, response: {datos_alumnos_docentes_aulas: {alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_exist, aulas_uso}, datos_niveles: {SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS}}} = response;

    if (success) {
      notificacion_toastify("Datos consultados")

      pintar_alumnos(alum_hom, alum_muj, alum_tot)
      pintar_docentes(doc_hom, doc_muj, doc_tot)
      pintar_aulas(aulas_uso, aulas_exist)
      pintar_tabla_alumnos_docente_aulas(alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_uso, aulas_exist)
      pintar_niveles(SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS)
      pintar_tabla_niveles(SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS)
    }
  });
}

//Consultar municipios
notificacion_toastify_carga()
request_post("/api/v1/usuarios/consultar_rol_usuario", {}).then((response) => {
  const {success, message, response: {rol_id, id_usuario}} = response;

  if (success) {
    //Cargar el rol
    rol = rol_id
    usuario = id_usuario

    //Cargar municipios
    request_get("/api/v1/municipios/consultar_municipios").then((response) => {
      const {success, response: municipios} = response;

      if (success) {
        pintar_select_menu_municipios(municipios);

        //Estilo choice select
        let choices = document.querySelectorAll(".choices");
        let initChoice;
        for (let i = 0; i < choices.length; i++) {
          if (choices[i].classList.contains("multiple-remove")) {
            initChoice = new Choices(choices[i], {
              delimiter: ",",
              editItems: true,
              maxItemCount: -1,
              removeItemButton: true,
            });
          } else {
            initChoice = new Choices(choices[i]);
          }
        }

        //Consultar alumnos, docentes y aulas
        pintar_dashboard()
      }
    });
  } else {
    Swal.fire("Error", message, "error");
  }
})

//On change select municipios
$("#bashboard_select_municipio").on("change", () => {
  notificacion_toastify_carga();
  pintar_dashboard()
});

//Socket
const socket = io.connect();

socket.on("agregar_escuela", () => {
  console.log("agregar_escuela")
  pintar_dashboard()
  notificacion_toastify("Nueva escuela registrada")
});

socket.on("editar_escuela", () => {
  console.log("editar_escuela")
  pintar_dashboard()
  notificacion_toastify("Escuela editada")
});

socket.on("eliminar_escuela", () => {
  console.log("eliminar_escuela")
  pintar_dashboard()
  notificacion_toastify("Escuela eliminada")
});

socket.on("editar_usuario", mensaje_socket => {
  console.log("editar_usuario")

  if (mensaje_socket.id_usuario.toString() === usuario.toString()) {
    request_get("/api/v1/usuarios/validar_session").then((response) => {
      console.log(response);
    })
  }
});

socket.on("eliminar_usuario", mensaje_socket => {
  console.log("eliminar_usuario")

  if (mensaje_socket.id_usuario.toString() === usuario.toString()) {
    request_get("/api/v1/usuarios/validar_session").then((response) => {
      console.log(response);
    })
  }
});
