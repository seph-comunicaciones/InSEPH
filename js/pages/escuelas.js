let escuelas_datatable = null;
let escuelas_local = [];
let servicios_local = [];
let tipos_local = [];
let escuela_actual = null;

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
const pintar_select_menu_municipios = (municipios) => {
  $("#escuelas_select_municipio").empty();

  let options_select = `<option value="">Elige una opción</option>`;
  municipios.forEach((municipio) => (options_select += `<option value="${municipio.id_municipio}">${municipio.nom_municipio}</option>`));

  $("#escuelas_select_municipio").append(options_select);
};

const pintar_tabla_escuelas = (escuelas) => {
  $("#container_table_escuelas").empty();
  escuelas_datatable = null;
  escuelas_local = escuelas;

  let table = `<table class="table" id="table_escuelas">
                <thead>
                  <tr>
                    <th>Clave del centro de trabajo</th>
                    <th>Nombre del centro de trabajo</th>
                    <th>Nombre del municipio</th>
                    <th>Nombre del turno</th>
                    <th>Visualizar</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody> `;

  escuelas.forEach((escuela) => {
    table += `<tr>
                <td>${escuela.clave}</td>
                <td>${escuela.nombre}</td>
                <td>${escuela.nom_municipio}</td>
                <td>${escuela.nom_turno}</td>
                <td style="text-align: center">
                  <button data-id="${escuela.id_escuela}" data-type="visualizar_escuela" class="btn btn-success control_escuela">
                    <i class="bi bi-eye-fill"></i>
                  </button>
                </td>
                <td style="text-align: center">
                  <button data-id="${escuela.id_escuela}" data-type="editar_escuela" class="btn btn-primary control_escuela">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td style="text-align: center">
                  <button data-id="${escuela.id_escuela}" data-type="eliminar_escuela" class="btn btn-danger control_escuela">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>`;
  });

  table += ` </tbody> 
            </table>`;

  $("#container_table_escuelas").append(table);

  //Datatable
  escuelas_datatable = $("#table_escuelas").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
};

const validar_campo_modal_escuela = (campo, nombre, row) => {
  return `${
    campo
      ? `<div class='col-md-${row} col-12'>
        <label class="form-label">
          ${nombre}: ${campo}
        </label>
      </div>`
      : ""
  }`;
};

const visualizar_escuela = (escuela) => {
  $("#modal_label").text("Información de la escuela");

  $("#modal_body").html(`<div class="row">
                          <div class="col-12"><label class="form-label">Imagen escuela</label></div>
                        </div>
                        <hr>
                        <div class="row">
                          ${validar_campo_modal_escuela(escuela.clave, "Clave", "6")}
                          ${validar_campo_modal_escuela(escuela.nombre, "Nombre", "6")}
                          ${validar_campo_modal_escuela(escuela.direccion, "Dirección", "6")}
                          ${validar_campo_modal_escuela(escuela.nom_municipio, "Municipio", "6")}
                          ${validar_campo_modal_escuela(escuela.nom_modelo, "Modelo", "6")}
                          ${validar_campo_modal_escuela(escuela.nom_control, "Control", "6")}
                          ${validar_campo_modal_escuela(escuela.nom_turno, "Turno", "6")}
                          ${validar_campo_modal_escuela(escuela.nom_nivel, "Nivel", "6")}
                          ${validar_campo_modal_escuela(escuela.pag_web, "Pagina web", "6")}
                          ${validar_campo_modal_escuela(escuela.telefono, "Telefono", "6")}
                        </div>
                        <hr>
                        <div class="row">
                          ${validar_campo_modal_escuela(escuela.alum_muj, "Alumnos (Mujeres)", "4")}
                          ${validar_campo_modal_escuela(escuela.alum_hom, "Alumnos (Hombres)", "4")}
                          ${validar_campo_modal_escuela(escuela.alum_muj + escuela.alum_hom, "Alumnos (Total)", "4")}
                          ${validar_campo_modal_escuela(escuela.doc_muj, "Docentes (Mujeres)", "4")}
                          ${validar_campo_modal_escuela(escuela.doc_hom, "Docentes (Hombres)", "4")}
                          ${validar_campo_modal_escuela(escuela.doc_muj + escuela.doc_hom, "Docentes (Total)", "4")}
                          ${validar_campo_modal_escuela(escuela.aulas_exist, "Aulas (Existentes)", "4")}
                          ${validar_campo_modal_escuela(escuela.aulas_uso, "Aulas (En uso)", "4")}
                        </div>
                        <hr>
                        <div class="col-12">
                          <div style="display: flex; justify-content: center">
                            <div class="googlemaps">
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.6091242787!2d107.57311654129782!3d-6.903273917028756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1633023222539!5m2!1sen!2sid" width="600" height="450" style="border: 0" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                          </div>
                        </div>`);

  $("#modal_footer").html(`<button type="button" class="btn btn-primary ml-1" data-bs-dismiss="modal">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Cerrar</span>
                          </button>`);

  $("#modal_datos_escuela").click();
};

const validar_campo_edit_escuela = (campo, id) => {
  if (campo && $(`#${id}`).length > 0) {
    $(`#${id}`).val(campo);
  }
};

const editar_escuela = (escuela) => {
  $("#form_edit_escuela")[0].reset();
  img_escuela_edit.removeFile();

  validar_campo_edit_escuela(escuela.clave, "clave_centro_edit");
  validar_campo_edit_escuela(escuela.nombre, "nombre_centro_edit");
  validar_campo_edit_escuela(escuela.pag_web, "pagina_edit");
  validar_campo_edit_escuela(escuela.telefono, "telefono_edit");
  validar_campo_edit_escuela(escuela.alum_muj, "alumnos_mujeres_edit");
  validar_campo_edit_escuela(escuela.alum_hom, "alumnos_hombres_edit");
  validar_campo_edit_escuela(escuela.alum_hom + escuela.alum_muj, "alumnos_totales_edit");
  validar_campo_edit_escuela(escuela.doc_muj, "docentes_mujeres_edit");
  validar_campo_edit_escuela(escuela.doc_hom, "docentes_hombres_edit");
  validar_campo_edit_escuela(escuela.doc_hom + escuela.doc_muj, "docentes_totales_edit");
  validar_campo_edit_escuela(escuela.aulas_exist, "aulas_existentes_edit");
  validar_campo_edit_escuela(escuela.aulas_uso, "aulas_uso_edit");
  validar_campo_edit_escuela(escuela.turno_id, "turno_edit");
  validar_campo_edit_escuela(escuela.control_id, "control_edit");
  validar_campo_edit_escuela(escuela.modelo_id, "modelo_edit");
  validar_campo_edit_escuela(escuela.tipo_id, "tipo_edit");
  validar_campo_edit_escuela(escuela.servicio_educativo_id, "servicio_edit");
  validar_campo_edit_escuela(escuela.sostenimiento_id, "sostenimiento_edit");
  validar_campo_edit_escuela(escuela.municipio_id, "municipio_edit");
  validar_campo_edit_escuela(escuela.nivel_id, "nivel_edit");

  $("#menu_escuelas").addClass("d-none");
  $("#editar_escuela").removeClass("d-none");
};

//Cargar municipios
notificacion_carga();
request_get("/api/v1/municipios/consultar_municipios").then((response) => {
  const { success, response: municipios } = response;

  if (success) {
    $(`#municipio`).empty();
    $(`#municipio_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    municipios.forEach((municipio) => (opciones_select += ` <option value="${municipio.id_municipio}">${municipio.nom_municipio}</option> `));

    $(`#municipio`).append(opciones_select);
    $(`#municipio_edit`).append(opciones_select);

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

    request_post("/api/v1/escuelas/consultar_escuelas", {
      id_municipio: $("#escuelas_select_municipio").val(),
    }).then((response) => {
      const { success, response: escuelas } = response;

      if (success) {
        notificacion("Escuelas consultadas");
        pintar_tabla_escuelas(escuelas);
      }
    });
  }
});

//Carga de catalogos

//Turnos
request_get("/api/v1/turnos/consultar_turnos").then((response) => {
  const { success, response: turnos } = response;

  if (success) {
    $(`#turno`).empty();
    $(`#turno_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    turnos.forEach((turno) => (opciones_select += ` <option value="${turno.id_turno}">${turno.nom_turno}</option> `));

    $(`#turno`).append(opciones_select);
    $(`#turno_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Niveles educativos
request_get("/api/v1/sistemas_educativos/consultar_niveles").then((response) => {
  const { success, response: niveles } = response;

  if (success) {
    $(`#nivel`).empty();
    $(`#nivel_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    niveles.forEach((nivel) => (opciones_select += ` <option value="${nivel.id_nivel}">${nivel.nom_nivel}</option> `));

    $(`#nivel`).append(opciones_select);
    $(`#nivel_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Servicios educativos
request_get("/api/v1/sistemas_educativos/consultar_servicios").then((response) => {
  const { success, response: servicios } = response;

  if (success) {
    servicios_local = servicios;

    $(`#servicio`).empty();
    $(`#servicio_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    servicios.forEach((servicio) => (opciones_select += ` <option value="${servicio.id_servicio_educativo}">${servicio.nom_servicio_educativo}</option> `));

    $(`#servicio`).append(opciones_select);
    $(`#servicio_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Tipos educativos
request_get("/api/v1/sistemas_educativos/consultar_tipos").then((response) => {
  const { success, response: tipos } = response;

  if (success) {
    tipos_local = tipos;

    $(`#tipo`).empty();
    $(`#tipo_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    tipos.forEach((tipo) => (opciones_select += ` <option value="${tipo.id_tipo}">${tipo.nom_tipo}</option> `));

    $(`#tipo`).append(opciones_select);
    $(`#tipo_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Controles
request_get("/api/v1/controles/consultar_controles").then((response) => {
  const { success, response: controles } = response;

  if (success) {
    $(`#control`).empty();
    $(`#control_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    controles.forEach((control) => (opciones_select += ` <option value="${control.id_control}">${control.nom_control}</option> `));

    $(`#control`).append(opciones_select);
    $(`#control_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Sostenimiento
request_get("/api/v1/sostenimientos/consultar_sostenimientos").then((response) => {
  const { success, response: sostenimientos } = response;

  if (success) {
    $(`#sostenimiento`).empty();
    $(`#sostenimiento_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    sostenimientos.forEach((sostenimiento) => (opciones_select += ` <option value="${sostenimiento.id_sostenimiento}">${sostenimiento.nom_sostenimiento}</option> `));

    $(`#sostenimiento`).append(opciones_select);
    $(`#sostenimiento_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Modelos
request_get("/api/v1/modelos/consultar_modelos").then((response) => {
  const { success, response: modelos } = response;

  if (success) {
    $(`#modelo`).empty();
    $(`#modelo_edit`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    modelos.forEach((modelo) => (opciones_select += ` <option value="${modelo.id_modelo}">${modelo.nom_modelo}</option> `));

    $(`#modelo`).append(opciones_select);
    $(`#modelo_edit`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//On change select municipios
$("#escuelas_select_municipio").on("change", () => {
  notificacion_carga();
  request_post("/api/v1/escuelas/consultar_escuelas", {
    id_municipio: $("#escuelas_select_municipio").val(),
  }).then((response) => {
    const { success, response: escuelas } = response;

    if (success) {
      notificacion("Escuelas consultadas");
      pintar_tabla_escuelas(escuelas);
    }
  });
});

//Validar que el formulario este lleno para enviar
const validar_form_escuela = () => {
  for (let i = 0; i < $(".validacion").length; i++) {
    if ($(`#${$(".validacion")[i].id}`).val() === "" || $(`#${$(".validacion")[i].id}`).val() === 0) {
      return false;
    }
  }

  return true;
};

const validar_form_edit_escuela = () => {
  for (let i = 0; i < $(".validacion_edit").length; i++) {
    if ($(`#${$(".validacion_edit")[i].id}`).val() === "" || $(`#${$(".validacion_edit")[i].id}`).val() === 0) {
      return false;
    }
  }

  return true;
};

//Validacion formulario
$.extend(window.Parsley.options, {
  focus: "first",
  excluded: "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
  triggerAfterFailure: "change blur",
  errorsContainer: function (element) {},
  trigger: "change",
  successClass: "is-valid",
  errorClass: "is-invalid",
  classHandler: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsContainer: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsWrapper: '<div class="parsley-error"></div>',
  errorTemplate: "<span></span>",
});

Parsley.on("field:validated", function (el) {
  var elNode = $(el)[0];
  if (elNode && !elNode.isValid()) {
    var rqeuiredValResult = elNode.validationResult.filter(function (vr) {
      return vr.assert.name === "required";
    });
    if (rqeuiredValResult.length > 0) {
      var fieldNode = $(elNode.element);
      var formGroupNode = fieldNode.closest(".form-group");
      var lblNode = formGroupNode.find(".form-label:first");
      if (lblNode.length > 0) {
        var errorNode = formGroupNode.find("div.parsley-error span[class*=parsley-]");
        if (errorNode.length > 0) {
          var lblText = lblNode.text();
          if (lblText) {
            errorNode.html(lblText + " es necesario.");
          }
        }
      }
    }
  }
});

//Agregar nueva escuela
$("#btn_nueva_escuela").click(() => {
  $("#form_nueva_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").addClass("d-none");
  $("#nueva_escuela").removeClass("d-none");
});

// Filepond: Image Preview
FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

let img_escuela = FilePond.create(document.querySelector("#img_escuela"), {
  credits: null,
  labelIdle: "Selecciona o arrastra la imagen de la escuela",
});

let img_escuela_edit = FilePond.create(document.querySelector("#img_escuela_edit"), {
  credits: null,
  labelIdle: "Selecciona o arrastra la imagen de la escuela",
});

//On change totales alumnos
$("#alumnos_mujeres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales").val(parseInt(input_val) + (Number.isInteger(parseInt($("#alumnos_hombres").val())) === true ? parseInt($("#alumnos_hombres").val()) : 0));
});

$("#alumnos_hombres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales").val(parseInt(input_val) + (Number.isInteger(parseInt($("#alumnos_mujeres").val())) === true ? parseInt($("#alumnos_mujeres").val()) : 0));
});

//On change totales docentes
$("#docentes_mujeres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales").val(parseInt(input_val) + (Number.isInteger(parseInt($("#docentes_hombres").val())) === true ? parseInt($("#docentes_hombres").val()) : 0));
});

$("#docentes_hombres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales").val(parseInt(input_val) + (Number.isInteger(parseInt($("#docentes_mujeres").val())) === true ? parseInt($("#docentes_mujeres").val()) : 0));
});

//Guardar nueva escuela
$("#form_nueva_escuela").on("submit", (event) => event.preventDefault());

$("#btn_guardar_escuela").click(() => {
  if (validar_form_escuela()) {
    notificacion_carga();
    request_post("/api/v1/escuelas/agregar_escuela", {
      clave: $("#clave_centro").val(),
      nombre: $("#nombre_centro").val(),
      pag_web: $("#pagina").val(),
      telefono: $("#telefono").val(),
      alum_muj: $("#alumnos_mujeres").val(),
      alum_hom: $("#alumnos_hombres").val(),
      doc_muj: $("#docentes_mujeres").val(),
      doc_hom: $("#docentes_hombres").val(),
      aulas_exist: $("#aulas_existentes").val(),
      aulas_uso: $("#aulas_uso").val(),
      turno_id: $("#turno").val(),
      control_id: $("#control").val(),
      modelo_id: $("#modelo").val(),
      tipo_id: $("#tipo").val(),
      servicio_educativo_id: $("#servicio").val(),
      sostenimiento_id: $("#sostenimiento").val(),
      municipio_id: $("#municipio").val(),
      nivel_id: $("#nivel").val(),
    }).then((response) => {
      const { success, message } = response;

      if (success) {
        request_post("/api/v1/escuelas/consultar_escuelas", {
          id_municipio: $("#escuelas_select_municipio").val(),
        }).then((response) => {
          const { success, response: escuelas } = response;

          if (success) {
            pintar_tabla_escuelas(escuelas);
          }
        });

        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Escuela registrada",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

        $("#form_nueva_escuela")[0].reset();
        img_escuela.removeFile();

        $("#menu_escuelas").removeClass("d-none");
        $("#nueva_escuela").addClass("d-none");
      } else {
        Swal.fire("Error", message, "error");
      }
    });
  }
});

//Cancelar nueva escuela
$("#btn_cancelar_escuela").click(() => {
  $("#form_nueva_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  $("#nueva_escuela").addClass("d-none");
});

//On change totales alumnos
$("#alumnos_mujeres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales_edit").val(parseInt(input_val) + (Number.isInteger(parseInt($("#alumnos_hombres_edit").val())) === true ? parseInt($("#alumnos_hombres_edit").val()) : 0));
});

$("#alumnos_hombres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales_edit").val(parseInt(input_val) + (Number.isInteger(parseInt($("#alumnos_mujeres_edit").val())) === true ? parseInt($("#alumnos_mujeres_edit").val()) : 0));
});

//On change totales docentes
$("#docentes_mujeres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales_edit").val(parseInt(input_val) + (Number.isInteger(parseInt($("#docentes_hombres_edit").val())) === true ? parseInt($("#docentes_hombres_edit").val()) : 0));
});

$("#docentes_hombres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales_edit").val(parseInt(input_val) + (Number.isInteger(parseInt($("#docentes_mujeres_edit").val())) === true ? parseInt($("#docentes_mujeres_edit").val()) : 0));
});

//Control escuelas
$("#main").on("click", ".control_escuela", (event) => {
  const button = event.currentTarget;
  const type = button.dataset.type;
  const id = button.dataset.id;

  escuela_actual = id;

  switch (type) {
    case "visualizar_escuela":
      notificacion_carga();
      request_post("/api/v1/escuelas/consultar_escuela", {
        id_escuela: id,
      }).then((response) => {
        const { success, message, response: escuela } = response;

        if (success) {
          notificacion("Escuela consultada");
          visualizar_escuela(escuela);
        } else {
          Swal.fire("Error", message, "error");
        }
      });
      break;
    case "editar_escuela":
      notificacion_carga();
      request_post("/api/v1/escuelas/consultar_escuela", {
        id_escuela: id,
      }).then((response) => {
        const { success, message, response: escuela } = response;

        if (success) {
          notificacion("Escuela consultada");
          editar_escuela(escuela);
        } else {
          Swal.fire("Error", message, "error");
        }
      });
      break;
    case "eliminar_escuela":
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No podras revetir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          notificacion_carga();

          request_post("/api/v1/escuelas/aliminar_escuela", {
            id_escuela: id,
          }).then((response) => {
            const { success, message } = response;

            if (success) {
              request_post("/api/v1/escuelas/consultar_escuelas", {
                id_municipio: $("#escuelas_select_municipio").val(),
              }).then((response) => {
                const { success, response: escuelas } = response;

                if (success) {
                  pintar_tabla_escuelas(escuelas);
                }
              });

              Swal.fire("Eliminado", message, "success");
            } else {
              Swal.fire("Error", message, "error");
            }
          });
        }
      });
      break;
  }
});

//Cancelar editar escuela
$("#btn_cancelar_edit_escuela").click(() => {
  $("#form_edit_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  $("#editar_escuela").addClass("d-none");
});

//Guardar editar escuela
$("#form_edit_escuela").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_escuela").click(() => {
  if (validar_form_edit_escuela()) {
    notificacion_carga();
    request_post("/api/v1/escuelas/editar_escuela", {
      id_escuela: escuela_actual,
      clave: $("#clave_centro_edit").val(),
      nombre: $("#nombre_centro_edit").val(),
      pag_web: $("#pagina_edit").val(),
      telefono: $("#telefono_edit").val(),
      alum_muj: $("#alumnos_mujeres_edit").val(),
      alum_hom: $("#alumnos_hombres_edit").val(),
      doc_muj: $("#docentes_mujeres_edit").val(),
      doc_hom: $("#docentes_hombres_edit").val(),
      aulas_exist: $("#aulas_existentes_edit").val(),
      aulas_uso: $("#aulas_uso_edit").val(),
      turno_id: $("#turno_edit").val(),
      control_id: $("#control_edit").val(),
      modelo_id: $("#modelo_edit").val(),
      tipo_id: $("#tipo_edit").val(),
      servicio_educativo_id: $("#servicio_edit").val(),
      sostenimiento_id: $("#sostenimiento_edit").val(),
      municipio_id: $("#municipio_edit").val(),
      nivel_id: $("#nivel_edit").val(),
    }).then((response) => {
      const { success, message } = response;

      if (success) {
        request_post("/api/v1/escuelas/consultar_escuelas", {
          id_municipio: $("#escuelas_select_municipio").val(),
        }).then((response) => {
          const { success, response: escuelas } = response;

          if (success) {
            pintar_tabla_escuelas(escuelas);
          }
        });

        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Escuela actualizada",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

        $("#form_edit_escuela")[0].reset();
        img_escuela_edit.removeFile();

        $("#menu_escuelas").removeClass("d-none");
        $("#editar_escuela").addClass("d-none");
      } else {
        Swal.fire("Error", message, "error");
      }
    });
  }
});
