//Notficaciones
const notificacion = (mensaje) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
  }).showToast();
};

const notificacion_carga = () => {
  Toastify({
    text: "Cargando...",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
  }).showToast();
};

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

const pintar_niveles = (preescolar, primaria, secundaria, bachiller, licenciatura, posgrado) => {
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
        data: [preescolar ? preescolar : 0, primaria ? primaria : 0, secundaria ? secundaria : 0, bachiller ? bachiller : 0, licenciatura ? licenciatura : 0, posgrado ? posgrado : 0,],
      },
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        "Preescolar",
        "Primaria",
        "Secundaria",
        "Bachiller",
        "Licenciatura",
        "Posgrado",
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
                        <td>${alumnos_hombres}</td>
                        <td>${alumnos_mujeres}</td>
                        <td>${alumnos_total}</td>
                        <td>${docentes_hombres}</td>
                        <td>${docentes_mujeres}</td>
                        <td>${docentes_total}</td>
                        <td>${aulas_uso}</td>
                        <td>${aulas_existentes}</td>
                      </tr>
                      </tbody>
                    </table>`)
}

const pintar_tabla_niveles = (preescolar, primaria, secundaria, bachiller, licenciatura, posgrado) => {
  $("#container_tabla_niveles").empty()
  $("#container_tabla_niveles").append(`<table class="table mb-0">
                      <thead class="thead-dark">
                      <tr>
                        <th>Preescolar</th>
                        <th>Primaria</th>
                        <th>Secundaria</th>
                        <th>Bachiller</th>
                        <th>Licenciatura</th>
                        <th>Posgrado</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${preescolar?preescolar:0}</td>
                        <td>${primaria?primaria:0}</td>
                        <td>${secundaria?secundaria:0}</td>
                        <td>${bachiller?bachiller:0}</td>
                        <td>${licenciatura?licenciatura:0}</td>
                        <td>${posgrado?posgrado:0}</td>
                      </tr>
                      </tbody>
                    </table>`)
}

notificacion_carga()
//Consultar municipios
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
    request_post("/api/v1/dashboard/consultar_datos_alumnos_docentes_aulas", {
      "municipio_id": $("#bashboard_select_municipio").val()
    }).then((response) => {
      const {success, response: {datos_alumnos_docentes_aulas: {alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_exist, aulas_uso}, datos_preescolar: {preescolar}, datos_primaria: {primaria}, datos_secundaria: {secundaria}, datos_bachiller: {bachiller}, datos_licenciatura: {licenciatura}, datos_posgrado: {posgrado}}} = response;

      if (success) {
        notificacion("Datos consultados")

        pintar_alumnos(alum_hom, alum_muj, alum_tot)
        pintar_docentes(doc_hom, doc_muj, doc_tot)
        pintar_aulas(aulas_uso, aulas_exist)
        pintar_tabla_alumnos_docente_aulas(alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_uso, aulas_exist)
        pintar_niveles(preescolar, primaria, secundaria, bachiller, licenciatura, posgrado)
        pintar_tabla_niveles(preescolar, primaria, secundaria, bachiller, licenciatura, posgrado)
      }
    });
  }
});

//On change select municipios
$("#bashboard_select_municipio").on("change", () => {
  notificacion_carga();
  request_post("/api/v1/dashboard/consultar_datos_alumnos_docentes_aulas", {
    "municipio_id": $("#bashboard_select_municipio").val()
  }).then((response) => {
    const {success, response: {datos_alumnos_docentes_aulas: {alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_exist, aulas_uso}, datos_preescolar: {preescolar}, datos_primaria: {primaria}, datos_secundaria: {secundaria}, datos_bachiller: {bachiller}, datos_licenciatura: {licenciatura}, datos_posgrado: {posgrado}}} = response;

    if (success) {
      notificacion("Datos consultados")

      pintar_alumnos(alum_hom, alum_muj, alum_tot)
      pintar_docentes(doc_hom, doc_muj, doc_tot)
      pintar_aulas(aulas_uso, aulas_exist)
      pintar_tabla_alumnos_docente_aulas(alum_hom, alum_muj, alum_tot, doc_hom, doc_muj, doc_tot, aulas_uso, aulas_exist)
      pintar_niveles(preescolar, primaria, secundaria, bachiller, licenciatura, posgrado)
      pintar_tabla_niveles(preescolar, primaria, secundaria, bachiller, licenciatura, posgrado)    }
  });
});
