let escuelas_datatable = null;
let escuelas_local = [];
let servicios_local = [];
let tipos_local = [];
let escuela_actual = null;
let rol = false
let usuario = 0

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

  let table = `<table class="table" style="text-align: center" id="table_escuelas">
                <thead>
                  <tr>
                    <th style="text-align: center">Clave del centro de trabajo</th>
                    <th style="text-align: center">Nombre del centro de trabajo</th>
                    <th style="text-align: center">Nombre del municipio</th>
                    <th style="text-align: center">Nombre del turno</th>
                    <th style="text-align: center">Visualizar</th>
                    ${rol === 1 ? `
                    <th style="text-align: center">Editar</th> 
                    <th style="text-align: center">Eliminar</th>
                    ` : ``}
                  </tr>
                </thead>
                <tbody> `;

  escuelas.forEach((escuela) => {
    table += `<tr>
                <td>${escuela.clave}</td>
                <td>${escuela.nombre}</td>
                <td>${escuela.nom_municipio}</td>
                <td>${escuela.nom_turno}</td>
                <td><button id="row_${escuela.clave}" data-id="${escuela.id_escuela}" data-type="visualizar_escuela" class="btn btn-success control_escuela"><i class="bi bi-eye-fill"></i></button></td>
                ${rol === 1 ? `
                <td><button data-id="${escuela.id_escuela}" data-type="editar_escuela" class="btn btn-primary control_escuela"><i class="bi bi-pencil-square"></i></button></td>
                <td><button data-id="${escuela.id_escuela}" data-type="eliminar_escuela" class="btn btn-danger control_escuela"><i class="bi bi-trash3-fill"></i></button></td>
                ` : ``}
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

const vista_visualizar_escuela = (escuela) => {
  $("#form_vis_escuela")[0].reset();

  validar_img(escuela.imagen, "container_vis_img")

  validar_campo(escuela.clave, "clave_centro_vis");
  validar_campo(escuela.nombre, "nombre_centro_vis");
  validar_campo(escuela.pag_web, "pagina_vis");
  validar_campo(escuela.telefono, "telefono_vis");
  validar_campo(escuela.alum_muj, "alumnos_mujeres_vis");
  validar_campo(escuela.alum_hom, "alumnos_hombres_vis");
  validar_campo(escuela.alum_hom + escuela.alum_muj, "alumnos_totales_vis");
  validar_campo(escuela.doc_muj, "docentes_mujeres_vis");
  validar_campo(escuela.doc_hom, "docentes_hombres_vis");
  validar_campo(escuela.doc_hom + escuela.doc_muj, "docentes_totales_vis");
  validar_campo(escuela.aulas_exist, "aulas_existentes_vis");
  validar_campo(escuela.aulas_uso, "aulas_uso_vis");
  validar_campo(escuela.turno_id, "turno_vis");
  validar_campo(escuela.control_id, "control_vis");
  validar_campo(escuela.modelo_id, "modelo_vis");
  validar_campo(escuela.tipo_id, "tipo_vis");
  validar_campo(escuela.servicio_educativo_id, "servicio_vis");
  validar_campo(escuela.sostenimiento_id, "sostenimiento_vis");
  validar_campo(escuela.municipio_id, "municipio_vis");
  validar_campo(escuela.nivel_id, "nivel_vis");

  validar_campo(escuela.direccion, "direccion_vis");
  validar_campo(escuela.codigo_postal, "postal_maps_vis");
  validar_campo(escuela.colonia, "colonia_maps_vis");
  validar_campo(escuela.num_int, "num_int_maps_vis");
  validar_campo(escuela.num_ext, "num_ext_maps_vis");
  validar_campo(escuela.localidad, "localidad_maps_vis");

  $("#escuela_modificacion_vis").text(`Ultima modificación el ${escuela.fecha_modificacion} a las ${escuela.hora_modificacion} por ${escuela.usuario_nombre_modificacion} ${escuela.usuario_apellido_paterno_modificacion} ${escuela.usuario_apellido_materno_modificacion}`)

  $("#visualizar_escuela_sim").addClass("d-none");
  $("#visualizar_escuela").removeClass("d-none");
};

const vista_visualizar_escuela_sim = (escuela) => {
  $("#form_vis_sim_escuela")[0].reset();

  validar_img(escuela.imagen, "container_vis_sim_img")

  validar_campo(escuela.clave, "clave_centro_vis_sim");
  validar_campo(escuela.nombre, "nombre_centro_vis_sim");
  validar_campo(escuela.telefono, "telefono_vis_sim");
  validar_campo(escuela.pag_web, "pagina_vis_sim");
  validar_campo(escuela.alum_muj, "alumnos_mujeres_vis_sim");
  validar_campo(escuela.alum_hom, "alumnos_hombres_vis_sim");
  validar_campo(escuela.alum_hom + escuela.alum_muj, "alumnos_totales_vis_sim");
  validar_campo(escuela.doc_muj, "docentes_mujeres_vis_sim");
  validar_campo(escuela.doc_hom, "docentes_hombres_vis_sim");
  validar_campo(escuela.doc_hom + escuela.doc_muj, "docentes_totales_vis_sim");
  validar_campo(escuela.aulas_exist, "aulas_existentes_vis_sim");
  validar_campo(escuela.aulas_uso, "aulas_uso_vis_sim");

  validar_campo(escuela.direccion, "direccion_vis_sim");

  $("#escuela_modificacion_vis_sim").text(`Ultima modificación el ${escuela.fecha_modificacion} a las ${escuela.hora_modificacion} por ${escuela.usuario_nombre_modificacion} ${escuela.usuario_apellido_paterno_modificacion} ${escuela.usuario_apellido_materno_modificacion}`)

  $("#menu_escuelas").addClass("d-none");
  $("#visualizar_escuela_sim").removeClass("d-none");
};

const vista_editar_escuela = (escuela) => {
  $("#form_edit_escuela")[0].reset();
  img_escuela_edit.removeFile();

  validar_img(escuela.imagen, "container_edit_img")

  validar_campo(escuela.clave, "clave_centro_edit");
  validar_campo(escuela.nombre, "nombre_centro_edit");
  validar_campo(escuela.pag_web, "pagina_edit");
  validar_campo(escuela.telefono, "telefono_edit");
  validar_campo(escuela.alum_muj, "alumnos_mujeres_edit");
  validar_campo(escuela.alum_hom, "alumnos_hombres_edit");
  validar_campo(escuela.alum_hom + escuela.alum_muj, "alumnos_totales_edit");
  validar_campo(escuela.doc_muj, "docentes_mujeres_edit");
  validar_campo(escuela.doc_hom, "docentes_hombres_edit");
  validar_campo(escuela.doc_hom + escuela.doc_muj, "docentes_totales_edit");
  validar_campo(escuela.aulas_exist, "aulas_existentes_edit");
  validar_campo(escuela.aulas_uso, "aulas_uso_edit");
  validar_campo(escuela.turno_id, "turno_edit");
  validar_campo(escuela.control_id, "control_edit");
  validar_campo(escuela.modelo_id, "modelo_edit");
  validar_campo(escuela.tipo_id, "tipo_edit");
  validar_campo(escuela.servicio_educativo_id, "servicio_edit");
  validar_campo(escuela.sostenimiento_id, "sostenimiento_edit");
  validar_campo(escuela.municipio_id, "municipio_edit");
  validar_campo(escuela.nivel_id, "nivel_edit");

  validar_campo(escuela.direccion, "direccion_edit");
  validar_campo(escuela.codigo_postal, "postal_maps_edit");
  validar_campo(escuela.colonia, "colonia_maps_edit");
  validar_campo(escuela.num_int, "num_int_maps_edit");
  validar_campo(escuela.num_ext, "num_ext_maps_edit");
  validar_campo(escuela.localidad, "localidad_maps_edit");

  $("#escuela_modificacion_edit").text(`Ultima modificación el ${escuela.fecha_modificacion} a las ${escuela.hora_modificacion} por ${escuela.usuario_nombre_modificacion} ${escuela.usuario_apellido_paterno_modificacion} ${escuela.usuario_apellido_materno_modificacion}`)

  $("#menu_escuelas").addClass("d-none");
  $("#editar_escuela").removeClass("d-none");
};

const editar_escuela = (json) => {
  request_post("/api/v1/escuelas/editar_escuela", json).then((response) => {
    const {success, message} = response;

    if (success) {
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
      escuela_actual = null;
      $("#editar_escuela").addClass("d-none");
    } else {
      Swal.fire("Error", message, "error");
    }
  });
}

const agregar_escuela = (json) => {
  request_post("/api/v1/escuelas/agregar_escuela", json).then((response) => {
    const {success, message} = response;

    if (success) {
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
      escuela_actual = null;
      $("#nueva_escuela").addClass("d-none");
    } else {
      Swal.fire("Error", message, "error");
    }
  });
}

notificacion_carga();
request_post("/api/v1/usuarios/consultar_rol_usuario", {}).then((response) => {
  const {success, message, response: {rol_id, id_usuario}} = response;

  if (success) {
    //Cargar el rol
    rol = rol_id
    usuario = id_usuario

    if (rol_id === 1 || rol_id === 2) {
      $("#container_nueva_escuela").append(`<button type="button" id="btn_nueva_escuela" class="btn btn-success">
                                              <i class="bi bi-plus-circle"></i> Agregar escuela
                                            </button>`)

      //Agregar nueva escuela
      $("#btn_nueva_escuela").click(() => {
        $("#form_nueva_escuela")[0].reset();
        img_escuela.removeFile();

        $("#menu_escuelas").addClass("d-none");
        $("#nueva_escuela").removeClass("d-none");
      });
    }

    //Cargar municipios
    request_get("/api/v1/municipios/consultar_municipios").then((response) => {
      const {success, response: municipios} = response;

      if (success) {
        $(`#municipio`).empty();
        $(`#municipio_edit`).empty();
        $(`#municipio_vis`).empty();
        let opciones_select = `<option value="">Elige una opción</option> `;

        municipios.forEach((municipio) => (opciones_select += ` <option value="${municipio.id_municipio}">${municipio.nom_municipio}</option> `));

        $(`#municipio`).append(opciones_select);
        $(`#municipio_edit`).append(opciones_select);
        $(`#municipio_vis`).append(opciones_select);

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
          const {success, response: escuelas} = response;

          if (success) {
            notificacion("Escuelas consultadas");
            pintar_tabla_escuelas(escuelas);
          } else {
            Swal.fire("Error", message, "error");
          }
        });
      }
    });
  } else {
    Swal.fire("Error", message, "error");
  }
})

//Carga de catalogos

//Turnos
request_get("/api/v1/turnos/consultar_turnos").then((response) => {
  const {success, message, response: turnos} = response;

  if (success) {
    $(`#turno`).empty();
    $(`#turno_edit`).empty();
    $(`#turno_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    turnos.forEach((turno) => (opciones_select += ` <option value="${turno.id_turno}">${turno.nom_turno}</option> `));

    $(`#turno`).append(opciones_select);
    $(`#turno_edit`).append(opciones_select);
    $(`#turno_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Niveles educativos
request_get("/api/v1/sistemas_educativos/consultar_niveles").then((response) => {
  const {success, message, response: niveles} = response;

  if (success) {
    $(`#nivel`).empty();
    $(`#nivel_edit`).empty();
    $(`#nivel_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    niveles.forEach((nivel) => (opciones_select += ` <option value="${nivel.id_nivel}">${nivel.nom_nivel}</option> `));

    $(`#nivel`).append(opciones_select);
    $(`#nivel_edit`).append(opciones_select);
    $(`#nivel_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Servicios educativos
request_get("/api/v1/sistemas_educativos/consultar_servicios").then((response) => {
  const {success, message, response: servicios} = response;

  if (success) {
    servicios_local = servicios;

    $(`#servicio`).empty();
    $(`#servicio_edit`).empty();
    $(`#servicio_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    servicios.forEach((servicio) => (opciones_select += ` <option value="${servicio.id_servicio_educativo}">${servicio.nom_servicio_educativo}</option> `));

    $(`#servicio`).append(opciones_select);
    $(`#servicio_edit`).append(opciones_select);
    $(`#servicio_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Tipos educativos
request_get("/api/v1/sistemas_educativos/consultar_tipos").then((response) => {
  const {success, message, response: tipos} = response;

  if (success) {
    tipos_local = tipos;

    $(`#tipo`).empty();
    $(`#tipo_edit`).empty();
    $(`#tipo_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    tipos.forEach((tipo) => (opciones_select += ` <option value="${tipo.id_tipo}">${tipo.nom_tipo}</option> `));

    $(`#tipo`).append(opciones_select);
    $(`#tipo_edit`).append(opciones_select);
    $(`#tipo_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Controles
request_get("/api/v1/controles/consultar_controles").then((response) => {
  const {success, message, response: controles} = response;

  if (success) {
    $(`#control`).empty();
    $(`#control_edit`).empty();
    $(`#control_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    controles.forEach((control) => (opciones_select += ` <option value="${control.id_sost_control}">${control.nom_sost_control}</option> `));

    $(`#control`).append(opciones_select);
    $(`#control_edit`).append(opciones_select);
    $(`#control_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Sostenimiento
request_get("/api/v1/sostenimientos/consultar_sostenimientos").then((response) => {
  const {success, message, response: sostenimientos} = response;

  if (success) {
    $(`#sostenimiento`).empty();
    $(`#sostenimiento_edit`).empty();
    $(`#sostenimiento_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    sostenimientos.forEach((sostenimiento) => (opciones_select += ` <option value="${sostenimiento.id_sostenimiento}">${sostenimiento.nom_sostenimiento}</option> `));

    $(`#sostenimiento`).append(opciones_select);
    $(`#sostenimiento_edit`).append(opciones_select);
    $(`#sostenimiento_vis`).append(opciones_select);
  } else {
    Swal.fire("Error", message, "error");
  }
});

//Modelos
request_get("/api/v1/modelos/consultar_modelos").then((response) => {
  const {success, message, response: modelos} = response;

  if (success) {
    $(`#modelo`).empty();
    $(`#modelo_edit`).empty();
    $(`#modelo_vis`).empty();
    let opciones_select = `<option value="">Elige una opción</option> `;

    modelos.forEach((modelo) => (opciones_select += ` <option value="${modelo.id_modelo}">${modelo.nom_modelo}</option> `));

    $(`#modelo`).append(opciones_select);
    $(`#modelo_edit`).append(opciones_select);
    $(`#modelo_vis`).append(opciones_select);
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
    const {success, response: escuelas} = response;

    if (success) {
      notificacion("Escuelas consultadas");
      pintar_tabla_escuelas(escuelas);
    }
  });
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

$("#btn_guardar_escuela").click(async () => {
  if (validar_form()) {
    notificacion_carga();

    let json = {
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
      direccion: $("#direccion").val(),
      localidad: $("#localidad_maps").val(),
      colonia: $("#colonia_maps").val(),
      codigo_postal: $("#postal_maps").val(),
      num_int: $("#num_int_maps").val(),
      num_ext: $("#num_ext_maps").val(),
    }

    if (img_escuela.getFile()) {
      const data = new FormData();
      const blob = await comprimir_imagen(img_escuela.getFile().file, 50);
      data.append('archivo', new File([blob], img_escuela.getFile().file.name));

      subir_archivo(data).then((response) => {
        const {failure, success, message, response: {path}} = response

        if (success) {
          json.imagen = path
          agregar_escuela(json)
        }

        if (failure) Swal.fire("Error", message, "error");
      })
    } else {
      agregar_escuela(json)
    }
  }
});

//Cancelar nueva escuela
$("#btn_cancelar_escuela").click(() => {
  $("#form_nueva_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  escuela_actual = null;
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
        const {success, message, response: escuela} = response;

        if (success) {
          notificacion("Escuela consultada");
          vista_visualizar_escuela_sim(escuela);
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
        const {success, message, response: escuela} = response;

        if (success) {
          notificacion("Escuela consultada");
          vista_editar_escuela(escuela);
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

          request_post("/api/v1/escuelas/eliminar_escuela", {
            id_escuela: id,
          }).then((response) => {
            const {success, message} = response;

            if (success) {
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

//Visualizar información completa escuela
$("#btn_mas_vis_sim_escuela").click(() => {
  notificacion_carga();
  request_post("/api/v1/escuelas/consultar_escuela", {
    id_escuela: escuela_actual,
  }).then((response) => {
    const {success, message, response: escuela} = response;

    if (success) {
      notificacion("Escuela consultada");
      vista_visualizar_escuela(escuela);
    } else {
      Swal.fire("Error", message, "error");
    }
  });
});

//Regresar visualizar escuela
$("#btn_regresar_vis_escuela").click(() => {
  $("#form_vis_escuela")[0].reset();

  $("#menu_escuelas").removeClass("d-none");
  escuela_actual = null;
  $("#visualizar_escuela").addClass("d-none");
});

$("#btn_regresar_vis_sim_escuela").click(() => {
  $("#form_vis_sim_escuela")[0].reset();

  $("#menu_escuelas").removeClass("d-none");
  escuela_actual = null;
  $("#visualizar_escuela_sim").addClass("d-none");
});

//Cancelar editar escuela
$("#btn_cancelar_edit_escuela").click(() => {
  $("#form_edit_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  escuela_actual = null;
  $("#editar_escuela").addClass("d-none");
});

//Guardar editar escuela
$("#form_edit_escuela").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_escuela").click(async () => {
  if (validar_form_edit()) {
    notificacion_carga();
    let json = {
      id_escuela: escuela_actual,
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
      direccion: $("#direccion_edit").val(),
      localidad: $("#localidad_maps_edit").val(),
      colonia: $("#colonia_maps_edit").val(),
      codigo_postal: $("#postal_maps_edit").val(),
      num_int: $("#num_int_maps_edit").val(),
      num_ext: $("#num_ext_maps_edit").val(),
    }

    if (img_escuela_edit.getFile()) {
      const data = new FormData();
      const blob = await comprimir_imagen(img_escuela_edit.getFile().file, 50);
      data.append('archivo', new File([blob], img_escuela_edit.getFile().file.name));

      subir_archivo(data).then((response) => {
        const {failure, success, message, response: {path}} = response

        if (success) {
          json.imagen = path
          editar_escuela(json)
        }

        if (failure) Swal.fire("Error", message, "error");
      })
    } else {
      editar_escuela(json)
    }
  }
});

//Socket
const socket = io.connect();

socket.on("agregar_escuela", mensaje_socket => {
  console.log("agregar_escuela")
  let validacion_existente = false
  for (let i = 0; i < escuelas_datatable.rows().data().length; i++) {
    if (escuelas_datatable.data()[i][0] === mensaje_socket.clave) {
      validacion_existente = true
      break
    }
  }
  if (!validacion_existente) {
    const new_row = [mensaje_socket.clave, mensaje_socket.nombre, mensaje_socket.nom_municipio, mensaje_socket.nom_turno, `<td><button id="row_${mensaje_socket.clave}" data-id="${mensaje_socket.id_escuela}" data-type="visualizar_escuela" class="btn btn-success control_escuela"><i class="bi bi-eye-fill"></i></button></td>`]

    if (rol === 1) {
      new_row.push(`<td><button data-id="${mensaje_socket.id_escuela}" data-type="editar_escuela" class="btn btn-primary control_escuela"><i class="bi bi-pencil-square"></i></button></td>`)
      new_row.push(`<td><button data-id="${mensaje_socket.id_escuela}" data-type="eliminar_escuela" class="btn btn-danger control_escuela"><i class="bi bi-trash3-fill"></i></button></td>`)
    }

    escuelas_datatable.row.add(new_row).draw(false);
    notificacion("Nueva escuela registrada")
  }
});

socket.on("editar_escuela", mensaje_socket => {
  console.log("editar_escuela")
  for (let i = 0; i < escuelas_datatable.rows().data().length; i++) {
    if (escuelas_datatable.data()[i][0] === mensaje_socket.clave) {
      escuelas_datatable.cell({row: i, column: 0}).data(mensaje_socket.clave);
      escuelas_datatable.cell({row: i, column: 1}).data(mensaje_socket.nombre);
      escuelas_datatable.cell({row: i, column: 2}).data(mensaje_socket.nom_municipio);
      escuelas_datatable.cell({row: i, column: 3}).data(mensaje_socket.nom_turno);
      notificacion("Escuela editada")
      break
    }
  }

  if (escuela_actual === mensaje_socket.id_escuela.toString() && ($("#editar_escuela").attr("class").match("d-none") || $("#visualizar_escuela").attr("class").match("d-none"))) {
    request_post("/api/v1/escuelas/consultar_escuela", {
      id_escuela: escuela_actual,
    }).then((response) => {
      const {success, message, response: escuela} = response;

      if (success && $("#menu_escuelas").attr("class").match("d-none")) {
        if ($("#editar_escuela").attr("class").match("d-none")) {
          vista_visualizar_escuela_sim(escuela);
        } else if ($("#visualizar_escuela").attr("class").match("d-none")) {
          vista_editar_escuela(escuela);
        }
      }
    })
  }
});

socket.on("eliminar_escuela", mensaje_socket => {
  console.log("eliminar_escuela")
  for (let i = 0; i < escuelas_datatable.rows().data().length; i++) {
    if (escuelas_datatable.data()[i][0] === mensaje_socket.clave) {
      escuelas_datatable.row($(`#row_${mensaje_socket.clave}`).parents("tr")).remove().draw(false)
      notificacion("Escuela eliminada")
      break
    }
  }

  if (escuela_actual === mensaje_socket.id_escuela.toString()) {
    if ($("#menu_escuelas").attr("class").match("d-none")) {
      if ($("#editar_escuela").attr("class").match("d-none")) {
        $("#menu_escuelas").removeClass("d-none");
        $("#visualizar_escuela").addClass("d-none");
        escuela_actual = null
      } else if ($("#visualizar_escuela").attr("class").match("d-none")) {
        $("#menu_escuelas").removeClass("d-none");
        $("#editar_escuela").addClass("d-none");
        escuela_actual = null
      }
    }
  }
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