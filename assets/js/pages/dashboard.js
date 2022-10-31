console.log("Dashboard");

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
  colors: ["#435ebe", "#55c6e8"],
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
var options_docentes = {
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
  colors: ["#55c6e8"],
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
var options_aulas = {
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
  colors: ["#55c6e8"],
  xaxis: {
    categories: ["Aulas en uso", "Aulas existentes"],
  },
};
let chart_aulas = new ApexCharts(
  document.querySelector("#dashboard_chart_aulas"),
  options_aulas
);

chart_aulas.render();
