let rol = false
let usuario = 0

//Funciones
const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();
const pintar_alumnos = (alumnos_hombres, alumnos_mujeres) => {
  $("#dashboard_chart_alumnos").empty()

  let options_alumnos = {
    colors: ["#621132"],
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
    series: [
      {
        name: "Alumnos",
        data: [alumnos_hombres ? alumnos_hombres : 0, alumnos_mujeres ? alumnos_mujeres : 0],
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
      ],
    },
  };

  let chart_alumnos = new ApexCharts(
    document.querySelector("#dashboard_chart_alumnos"),
    options_alumnos
  );

  chart_alumnos.render();
}

const pintar_docentes = (docentes_hombres, docentes_mujeres) => {
  $("#dashboard_chart_docentes").empty()

  let options_docentes = {
    colors: ["#621132"],
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
    series: [
      {
        name: "Docentes",
        data: [docentes_hombres ? docentes_hombres : 0, docentes_mujeres ? docentes_mujeres : 0],
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
    colors: ["#621132"],
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
    colors: ["#621132"],
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

const pintar_alumnos_docente_aulas = (alumnos_hombres, alumnos_mujeres, docentes_hombres, docentes_mujeres, aulas_uso, aulas_existentes) => {
  $("#dashboard_alumnos_docentes_aulas").empty()

  let options_alumnos_docente_aulas = {
    colors: ["#621132"],
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
    series: [
      {
        name: "Niveles educativos",
        data: [alumnos_hombres ? alumnos_hombres : 0, alumnos_mujeres ? alumnos_mujeres : 0, docentes_hombres ? docentes_hombres : 0, docentes_mujeres ? docentes_mujeres : 0, aulas_uso ? aulas_uso : 0, aulas_existentes ? aulas_existentes : 0,],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        "Alumnos hombres",
        "Alumnos mujeres",
        "Docentes hombres",
        "Docentes mujeres",
        "Aulas uso",
        "Aulas existentes",
      ],
    },
  };
  let chart_alumnos_docente_aulas = new ApexCharts(
    document.querySelector("#dashboard_alumnos_docentes_aulas"),
    options_alumnos_docente_aulas
  );

  chart_alumnos_docente_aulas.render();
}

const pintar_poblacion = (poblacion, municipio) => {
  $("#dashboard_poblacion").empty()

  const options_poblacion = {
    colors: ["#bc955c", "#621132"],
    series: poblacion,
    chart: {
      width: 500,
      type: 'pie',
    },
    labels: municipio,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  let chart_poblacion = new ApexCharts(
    document.querySelector("#dashboard_poblacion"),
    options_poblacion
  );

  chart_poblacion.render();
}

const pintar_dashboard = () => {
  request_post("/api/v1/dashboard/consultar_datos_dashboard", {
    "municipio_id": $("#bashboard_select_municipio").val()
  }).then((response) => {
    const {success, response: {datos_alumnos_docentes_aulas: {alum_hom, alum_muj, doc_hom, doc_muj, aulas_exist, aulas_uso}, datos_niveles: {SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS}}} = response;

    if (success) {
      notificacion_toastify("Datos consultados")

      pintar_alumnos(alum_hom, alum_muj)
      pintar_docentes(doc_hom, doc_muj)
      pintar_aulas(aulas_uso, aulas_exist)
      pintar_alumnos_docente_aulas(alum_hom, alum_muj, doc_hom, doc_muj, aulas_uso, aulas_exist)
      pintar_niveles(SIN_DEFINIR, INICIAL, BASICA, MEDIA_SUPERIOR, SUPERIOR, CAPACITACION, ESPECIAL, OTROS)

      $("#totales_tab").click()
    }
  });

  if ($("#bashboard_select_municipio").val() === "") {
    request_get("https://gaia.inegi.org.mx/wscatgeo/mgee/13", false).then((response) => {
      const {datos} = response
      if (datos) {
        const {pob_fem, pob_mas} = datos
        pintar_poblacion([parseFloat(pob_fem), parseFloat(pob_mas)], ["Población Femenina", "Población Masculina"])
      }
    })
  } else {
    request_get(`https://gaia.inegi.org.mx/wscatgeo/mgem/130${fill($("#bashboard_select_municipio").val(), 2)}`, false).then((response) => {
      const {datos} = response
      if (datos.length > 0 && datos[0]) {
        const {pob_fem, pob_mas} = datos[0]
        pintar_poblacion([parseFloat(pob_fem), parseFloat(pob_mas)], ["Población Femenina", "Población Masculina"])
      }
    })
  }

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
    request_get("/api/v1/catalogos/consultar_municipios").then((response) => {
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
