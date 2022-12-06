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

const pintar_chart_indicadores_nacionales = (indicadores_chart_nacionales, id) => {
  $(`#${id}`).append(`<div class="buttons" id="menu_chart_indicadores_nacionales" style="display: flex; flex-wrap: wrap; justify-content: space-between;padding: 0.5rem;"></div>`)

  indicadores_chart_nacionales.forEach((indicador_chart) => {
    const {tittle, charts} = indicador_chart
    const id_tittle = tittle.toLowerCase().replaceAll(" ", "_").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "")

    $(`#${id}`).append(`<h2 class="indicador_nacional_chart container_indicador_nacional_${id_tittle}">${tittle}</h2>`)
    $(`#menu_chart_indicadores_nacionales`).append(`<button id="indicador_nacional_chart_${id_tittle}" type="button" data-type="${id_tittle}" class="btn btn-primary control_chart_indicadores_nacionales">${tittle}</button>`)

    charts.forEach((chart) => {
      const {sub_tittle, series, categories, message, semaforo, note, colors, footer} = chart
      const id_sub_tittle = sub_tittle.toLowerCase().replaceAll(" ", "_").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "")

      const id_chart = `chart_${id_tittle}_${id_sub_tittle}`

      const options = {
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
          colors: colors
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
                                  <p style="text-align: center;margin: auto;color: white;">${message}</p>
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

$("#menu_indicadores").on("click", ".control_chart_indicadores_nacionales", (event) => {
  const button = event.currentTarget
  const id = button.id
  const type = button.dataset.type

  $(".control_chart_indicadores_nacionales").removeClass("btn-success")
  $(`#${id}`).addClass('btn-success');

  $(`.indicador_nacional_chart`).addClass("d-none")
  $(`.container_indicador_nacional_${type}`).removeClass("d-none")
})

const pintar_tabla_indicadores_internacionales = (tittle, type, indicadores_internacionales) => {
  notificacion_toastify("Tabla de indicadores internacionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").addClass("d-none");

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
  $("#container_chart_indicadores").empty();
  $("#container_chart_indicadores").removeClass("d-none");

  pintar_chart_indicadores_nacionales(indicadores_chart_nacionales, "container_chart_indicadores")

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
}

const pintar_tabla_indicadores_estatales = (tittle, type, indicadores_estatales) => {
  notificacion_toastify("Tabla de indicadores estatales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
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
}

const pintar_tabla_indicadores_institucionales = (tittle, type, indicadores_institucionales) => {
  notificacion_toastify("Tabla de indicadores institucionales consultada")

  $("#container_tittle_indicadores").empty();
  $("#container_table_indicadores").empty();
  $("#container_chart_indicadores").addClass("d-none");

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

//Opciones de indicadores
request_get("/api/v1/usuarios/validar_session").then()

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
