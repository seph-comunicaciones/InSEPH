//Select
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

//Chart alumnos
let options_alumnos = {
  series: [76, 30],
  labels: ["Alumnos total (hombres)", "Alumnos total (mujeres)"],
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  chart: {
    type: "donut",
    width: "100%",
    height: "350px",
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "30%",
      },
    },
  },
};

let chart_alumnos = new ApexCharts(
  document.querySelector("#dashboard_chart_alumnos"),
  options_alumnos
);

chart_alumnos.render();

//Chart docentes
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
      data: [9, 20, 29],
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

//Chart aulas
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
      data: [34, 20],
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

//Chart preescolar
let options_preescolar = {
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
      name: "Preescolar",
      data: [34, 20, 15, 78],
    },
  ],
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  xaxis: {
    categories: [
      "Huehuetla",
      "Pachuca de Soto",
      "Tulancingo de Bravo",
      "Total",
    ],
  },
};
let chart_preescolar = new ApexCharts(
  document.querySelector("#dashboard_chart_preescolar"),
  options_preescolar
);

chart_preescolar.render();

//Chart primaria
let options_primaria = {
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
      name: "Primaria",
      data: [12, 67, 4, 100],
    },
  ],
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  xaxis: {
    categories: [
      "Huehuetla",
      "Pachuca de Soto",
      "Tulancingo de Bravo",
      "Total",
    ],
  },
};
let chart_primaria = new ApexCharts(
  document.querySelector("#dashboard_chart_primaria"),
  options_primaria
);

chart_primaria.render();

//Chart secundaria
let options_secundaria = {
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
      name: "Secundaria",
      data: [112, 23, 67, 150],
    },
  ],
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  xaxis: {
    categories: [
      "Huehuetla",
      "Pachuca de Soto",
      "Tulancingo de Bravo",
      "Total",
    ],
  },
};
let chart_secundaria = new ApexCharts(
  document.querySelector("#dashboard_chart_secundaria"),
  options_secundaria
);

chart_secundaria.render();

//Chart media superior
let options_media_superior = {
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
      name: "Media superior",
      data: [12, 55, 23, 70],
    },
  ],
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  xaxis: {
    categories: [
      "Huehuetla",
      "Pachuca de Soto",
      "Tulancingo de Bravo",
      "Total",
    ],
  },
};
let chart_media_superior = new ApexCharts(
  document.querySelector("#dashboard_chart_media_superior"),
  options_media_superior
);

chart_media_superior.render();
