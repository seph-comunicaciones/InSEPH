let escuelas_datatable = null;
let escuelas_local = [];
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

const validar_turno = (turno) => {
  return turno.substring(4) !== "NO NECESARIO" ? turno.substring(4) : "-"
}

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
                    <th style="text-align: center">Nombre del turno 1</th>
                    <th style="text-align: center">Director</th>
                    <th style="text-align: center">Mapa</th>
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
                <td>${escuela.id_cct}</td>
                <td>${escuela.nom_escuela}</td>
                <td>${escuela.nom_municipio}</td>
                <td>${validar_turno(escuela.nom_turno1)}</td>
                <td>${escuela.nombre_director ? escuela.nombre_director : "ACTUALIZÁNDOSE"}</td>
                <td><button data-latitud="${escuela.latitud}" data-longitud="${escuela.longitud}" data-type="mapa_escuela" class="btn btn-warning control_escuela"><i class="bi bi-geo-alt-fill"></i></button></td>
                <td><button id="row_${escuela.id_cct}" data-id="${escuela.id_escuela}" data-type="visualizar_escuela" class="btn btn-success control_escuela"><i class="bi bi-eye-fill"></i></button></td>
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

  validar_campo(escuela.cct, "clave_centro_vis");
  validar_campo(escuela.cct_plantel, "clave_plantel_vis");
  validar_campo(escuela.id_marca, "marca_vis");
  validar_campo(escuela.status_id_status, "estatus_vis");
  validar_campo(escuela.id_turno1, "turno_1_vis");
  validar_campo(escuela.id_turno2, "turno_2_vis");
  validar_campo(escuela.id_turno3, "turno_3_vis");
  validar_campo(escuela.id_nivel, "nivel_vis");
  validar_campo(escuela.id_tipo, "tipo_vis");
  validar_campo(escuela.nom_escuela, "nombre_centro_vis");
  validar_campo(escuela.nombre_director, "director_vis");
  validar_campo(escuela.id_municipio, "municipio_vis");
  validar_campo(escuela.id_asenta_codigo_postal, "postal_vis");
  validar_campo(escuela.colonia_localidad1, "asentamiento_vis");
  validar_campo(escuela.calle_principal, "vialidad_principal_vis");
  validar_campo(escuela.vialidad_derecha, "vialidad_derecha_vis");
  validar_campo(escuela.vialidad_izquierda, "vialidad_izquierda_vis");
  validar_campo(escuela.vialidad_posterior, "vialidad_posterior_vis");
  validar_campo(escuela.num_ext, "num_ext_vis");
  validar_campo(escuela.alf_ext, "num_ext_elf_vis");
  validar_campo(escuela.num_int, "num_int_vis");
  validar_campo(escuela.alf_int, "num_int_elf_vis");
  validar_campo(escuela.desc_ubicacion, "des_ubicacion_vis");
  validar_campo(escuela.latitud, "latitud_vis");
  validar_campo(escuela.longitud, "longitud_vis");
  validar_campo(escuela.id_region, "region_vis");
  validar_campo(escuela.id_sost_control, "sost_control_vis");
  validar_campo(escuela.id_sost_subcontrol, "sost_sub_control_vis");
  validar_campo(escuela.id_sost_dependencia1, "sost_dependencia_1_vis");
  validar_campo(escuela.id_sost_dependencia2, "sost_dependencia_2_vis");
  validar_campo(escuela.id_sost_dependencia3, "sost_dependencia_3_vis");
  validar_campo(escuela.id_sost_dependencia4, "sost_dependencia_4_vis");
  validar_campo(escuela.id_sost_servicio, "sost_servicio_vis");
  validar_campo(escuela.id_dep_operativa1, "dep_operativa_1_vis");
  validar_campo(escuela.id_dep_operativa2, "dep_operativa_2_vis");
  validar_campo(escuela.id_dep_operativa3, "dep_operativa_3_vis");
  validar_campo(escuela.id_dep_operativa4, "dep_operativa_4_vis");
  validar_campo(escuela.id_dep_operativa5, "dep_operativa_5_vis");
  validar_campo(escuela.cct_supervision, "supervicion_cct_vis");
  validar_campo(escuela.cct_jefaturasector, "jefsec_cct_vis");
  validar_campo(escuela.cct_serviciosregionales, "serreg_cct_vis");
  validar_campo(escuela.id_servicio_educativo, "servicio_vis");
  validar_campo(escuela.id_cam_servicio, "servicio_cam_vis");
  validar_campo(escuela.id_caracteristica1, "caracteristica_1_vis");
  validar_campo(escuela.id_caracteristica2, "caracteristica_2_vis");
  validar_campo(escuela.telefono, "telefono_vis");
  validar_campo(escuela.email, "correo_vis");
  validar_campo(escuela.pag_web, "pagina_vis");

  validar_campo(escuela.alumnos_mujeres, "alumnos_mujeres_vis");
  validar_campo(escuela.alumnos_hombres, "alumnos_hombres_vis");
  validar_campo(escuela.alumnos_hombres + escuela.alumnos_mujeres, "alumnos_totales_vis");
  validar_campo(escuela.docentes_mujeres, "docentes_mujeres_vis");
  validar_campo(escuela.docentes_hombres, "docentes_hombres_vis");
  validar_campo(escuela.docentes_hombres + escuela.docentes_mujeres, "docentes_totales_vis");
  validar_campo(escuela.aulas_existentes, "aulas_existentes_vis");
  validar_campo(escuela.aulas_uso, "aulas_uso_vis");

  validar_campo(`${escuela.nom_municipio}, escuela.colonia_localidad2, ${escuela.calle_principal}, ${escuela.num_int} ${escuela.num_ext} `, "direccion_vis");

  $("#escuela_modificacion_vis").text(`Ultima modificación el ${escuela.fecha_modificacion} a las ${escuela.hora_modificacion} por ${escuela.usuario_nombre_modificacion} ${escuela.usuario_apellido_paterno_modificacion} ${escuela.usuario_apellido_materno_modificacion}`)

  $("#visualizar_escuela_sim").addClass("d-none");
  $("#visualizar_escuela").removeClass("d-none");
};

const vista_visualizar_escuela_sim = (escuela) => {
  $("#form_vis_sim_escuela")[0].reset();

  validar_img(escuela.imagen, "container_vis_sim_img")

  validar_campo(escuela.cct, "clave_centro_vis_sim");
  validar_campo(escuela.nom_escuela, "nombre_centro_vis_sim");
  validar_campo(escuela.telefono, "telefono_vis_sim");
  validar_campo(escuela.email, "pagina_vis_sim");
  validar_campo(escuela.alumnos_mujeres, "alumnos_mujeres_vis_sim");
  validar_campo(escuela.alumnos_hombres, "alumnos_hombres_vis_sim");
  validar_campo(escuela.alumnos_hombres + escuela.alumnos_mujeres, "alumnos_totales_vis_sim");
  validar_campo(escuela.docentes_mujeres, "docentes_mujeres_vis_sim");
  validar_campo(escuela.docentes_hombres, "docentes_hombres_vis_sim");
  validar_campo(escuela.docentes_hombres + escuela.docentes_mujeres, "docentes_totales_vis_sim");
  validar_campo(escuela.aulas_existentes, "aulas_existentes_vis_sim");
  validar_campo(escuela.aulas_uso, "aulas_uso_vis_sim");

  validar_campo(`${escuela.nom_municipio}, ${escuela.colonia_localidad2}, ${escuela.calle_principal}, ${escuela.num_int} ${escuela.num_ext} `, "direccion_vis_sim");

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

notificacion_toastify_carga();
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
    request_get("/api/v1/catalogos/consultar_municipios").then((response) => {
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
            //Carga de catalogos
            request_get("/api/v1/catalogos/consultar_marcas").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_marca}">${consulta.nom_marca}</option> `));
                $(`#marca`).empty().append(opciones_select);
                $(`#marca_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_estatus").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_status}">${consulta.nom_status}</option> `));
                $(`#estatus`).empty().append(opciones_select);
                $(`#estatus_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_turnos_1").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_turno1}">${consulta.nom_turno1}</option> `));
                $(`#turno_1`).empty().append(opciones_select);
                $(`#turno_1_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_turnos_2").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_turno2}">${consulta.nom_turno2}</option> `));
                $(`#turno_2`).empty().append(opciones_select);
                $(`#turno_2_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_turnos_3").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_turno3}">${consulta.nom_turno3}</option> `));
                $(`#turno_3`).empty().append(opciones_select);
                $(`#turno_3_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_niveles").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_nivel}">${consulta.nom_nivel}</option> `));
                $(`#nivel`).empty().append(opciones_select);
                $(`#nivel_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_tipos").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_tipo}">${consulta.nom_tipo}</option> `));
                $(`#tipo`).empty().append(opciones_select);
                $(`#tipo_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_directores").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_director}">${consulta.nombre_director}</option> `));
                $(`#director`).empty().append(opciones_select);
                $(`#director_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_postal").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_asenta}">${consulta.d_codigo} - ${consulta.d_asenta} - ${consulta.c_tipo_asenta} - ${consulta.d_tipo_asenta}</option> `));
                $(`#postal`).empty().append(opciones_select);
                $(`#postal_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_region").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_region}">${consulta.nom_region}</option> `));
                $(`#region`).empty().append(opciones_select);
                $(`#region_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_control").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_control}">${consulta.nom_sost_control}</option> `));
                $(`#sost_control`).empty().append(opciones_select);
                $(`#sost_control_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_sub_control").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_subcontrol}">${consulta.nom_sost_subcontrol}</option> `));
                $(`#sost_sub_control`).empty().append(opciones_select);
                $(`#sost_sub_control_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_dependencia_1").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_dependencia1}">${consulta.nom_sost_dependencia1}</option> `));
                $(`#sost_dependencia_1`).empty().append(opciones_select);
                $(`#sost_dependencia_1_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_dependencia_2").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_dependencia2}">${consulta.nom_sost_dependencia2}</option> `));
                $(`#sost_dependencia_2`).empty().append(opciones_select);
                $(`#sost_dependencia_2_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_dependencia_3").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_dependencia3}">${consulta.nom_sost_dependencia3}</option> `));
                $(`#sost_dependencia_3`).empty().append(opciones_select);
                $(`#sost_dependencia_3_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_dependencia_4").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_dependencia4}">${consulta.nom_sost_dependencia4}</option> `));
                $(`#sost_dependencia_4`).empty().append(opciones_select);
                $(`#sost_dependencia_4_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_sostenimiento_servicio").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_sost_servicio}">${consulta.num_sost_servicio}</option> `));
                $(`#sost_servicio`).empty().append(opciones_select);
                $(`#sost_servicio_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_dependencia_operativa_1").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_dep_operativa1}">${consulta.nom_dep_operativa1}</option> `));
                $(`#dep_operativa_1`).empty().append(opciones_select);
                $(`#dep_operativa_1_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_dependencia_operativa_2").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_dep_operativa2}">${consulta.nom_dep_operativa2}</option> `));
                $(`#dep_operativa_2`).empty().append(opciones_select);
                $(`#dep_operativa_2_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_dependencia_operativa_3").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_dep_operativa3}">${consulta.nom_dep_operativa3}</option> `));
                $(`#dep_operativa_3`).empty().append(opciones_select);
                $(`#dep_operativa_3_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_dependencia_operativa_4").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_dep_operativa4}">${consulta.nom_dep_operativa4}</option> `));
                $(`#dep_operativa_4`).empty().append(opciones_select);
                $(`#dep_operativa_4_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_dependencia_operativa_5").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_dep_operativa5}">${consulta.nom_dep_operativa5}</option> `));
                $(`#dep_operativa_5`).empty().append(opciones_select);
                $(`#dep_operativa_5_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_servicio_educativo").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_servicio_educativo}">${consulta.nom_servicio_educativo}</option> `));
                $(`#servicio`).empty().append(opciones_select);
                $(`#servicio_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_servicio_cam").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_cam_servicio}">${consulta.nom_cam_servicio}</option> `));
                $(`#servicio_cam`).empty().append(opciones_select);
                $(`#servicio_cam_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_caracteristica_1").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_caracteristica1}">${consulta.nom_caracteristica1}</option> `));
                $(`#caracteristica_1`).empty().append(opciones_select);
                $(`#caracteristica_1_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            request_get("/api/v1/catalogos/consultar_caracteristica_2").then((response) => {
              const {success, message, response: consultas} = response;

              if (success) {
                let opciones_select = `<option value="">Elige una opción</option> `;
                consultas.forEach((consulta) => (opciones_select += ` <option value="${consulta.id_caracteristica2}">${consulta.nom_caracteristica2}</option> `));
                $(`#caracteristica_2`).empty().append(opciones_select);
                $(`#caracteristica_2_vis`).empty().append(opciones_select);
              } else {
                Swal.fire("Error", message, "error");
              }
            });

            notificacion_toastify("Escuelas consultadas");
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

//On change select municipios
$("#escuelas_select_municipio").on("change", () => {
  notificacion_toastify_carga();
  request_post("/api/v1/escuelas/consultar_escuelas", {
    id_municipio: $("#escuelas_select_municipio").val(),
  }).then((response) => {
    const {success, response: escuelas} = response;

    if (success) {
      notificacion_toastify("Escuelas consultadas");
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
    notificacion_toastify_carga();

    let json = {
      id_cct: $("#clave_centro").val(),
      marca_id_marca: $("#marca").val(),
      nom_escuela: $("#nombre_centro").val(),
      status_id_status: $("#estatus").val(),

      id_asenta_codigo_postal: $("#postal").val(),
      asenta2: $("#asentamiento").val(),
      vialidad_principal: $("#vialidad_principal").val(),
      vialidad_derecha: $("#vialidad_derecha").val(),
      vialidad_izquierda: $("#vialidad_izquierda").val(),
      vialidad_posterior: $("#vialidad_posterior").val(),
      num_ext: $("#num_ext").val(),
      alf_ext: $("#num_ext_elf").val(),
      num_int: $("#num_int").val(),
      alf_int: $("#num_int_elf").val(),
      desc_ubicacion: $("#des_ubicacion").val(),
      latitud: $("#latitud").val(),
      longitud: $("#longitud").val(),

      municipio_id_municipio: $("#municipio").val(),
      region_id_region: $("#region").val(),
      sost_control_id_sost_control: $("#sost_control").val(),
      sost_subcontrol_id_sost_subcontrol: $("#sost_sub_control").val(),
      sost_dependencian1_id_sost_dependencia1: $("#sost_dependencia_1").val(),
      sost_dependencian2_id_sost_dependencia2: $("#sost_dependencia_2").val(),
      sost_dependencian3_id_sost_dependencia3: $("#sost_dependencia_3").val(),
      sost_dependencian4_id_sost_dependencia4: $("#sost_dependencia_4").val(),
      sost_servicio_id_sost_servicio: $("#sost_servicio").val(),
      dep_operativa1_id_dep_operativa1: $("#dep_operativa_1").val(),
      dep_operativa2_id_dep_operativa2: $("#dep_operativa_2").val(),
      dep_operativa3_id_dep_operativa3: $("#dep_operativa_3").val(),
      dep_operativa4_id_dep_operativa4: $("#dep_operativa_4").val(),
      dep_operativa5_id_dep_operativa5: $("#dep_operativa_5").val(),
      supervision_id_cct: $("#supervicion_cct").val(),
      jefsec_id_cct: $("#jefsec_cct").val(),
      serreg_id_cct: $("#serreg_cct").val(),
      institucion_plantel: $("#clave_plantel").val(),
      turno1_id_turno1: $("#turno_1").val(),
      turno2_id_turno2: $("#turno_2").val(),
      turno3_id_turno3: $("#turno_3").val(),
      nivel_id_nivel: $("#nivel").val(),
      tipo_id_tipo: $("#tipo").val(),
      servicio_educativo_id_servicio_educativo: $("#servicio").val(),
      cam_servicio_id_cam_servicio: $("#servicio_cam").val(),
      caracteristica1_id_caracteristica1: $("#caracteristica_1").val(),
      caracteristica2_id_caracteristica2: $("#caracteristica_2").val(),
      telefono: $("#telefono").val(),
      email: $("#correo").val(),
      nombre_director: $("#director").val(),
      alumnos_hombres: $("#alumnos_hombres").val(),
      alumnos_mujeres: $("#alumnos_mujeres").val(),
      docentes_hombres: $("#docentes_hombres").val(),
      docentes_mujeres: $("#docentes_mujeres").val(),
      aulas_uso: $("#aulas_uso").val(),
      aulas_existentes: $("#aulas_existentes").val(),
      pag_web: $("#pagina").val(),
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
  const latitud = button.dataset.latitud;
  const longitud = button.dataset.longitud;

  escuela_actual = id;

  switch (type) {
    case "visualizar_escuela":
      notificacion_toastify_carga();
      request_post("/api/v1/escuelas/consultar_escuela", {
        id_escuela: id,
      }).then((response) => {
        const {success, message, response: escuela} = response;

        if (success) {
          notificacion_toastify("Escuela consultada");
          vista_visualizar_escuela_sim(escuela);
        } else {
          Swal.fire("Error", message, "error");
        }
      });
      break;
    case "editar_escuela":
      notificacion_toastify_carga();
      request_post("/api/v1/escuelas/consultar_escuela", {
        id_escuela: id,
      }).then((response) => {
        const {success, message, response: escuela} = response;

        if (success) {
          notificacion_toastify("Escuela consultada");
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
          notificacion_toastify_carga();

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
    case "mapa_escuela":
      const a = document.createElement("a")
      a.href = `https://maps.google.com/?q=${latitud},${longitud}`
      a.target = "_blank"
      a.click()
  }
});

//Visualizar información completa escuela
$("#btn_mas_vis_sim_escuela").click(() => {
  notificacion_toastify_carga();
  request_post("/api/v1/escuelas/consultar_escuela", {
    id_escuela: escuela_actual,
  }).then((response) => {
    const {success, message, response: escuela} = response;

    if (success) {
      notificacion_toastify("Escuela consultada");
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
    notificacion_toastify_carga();
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
    if (escuelas_datatable.data()[i][0] === mensaje_socket.cct) {
      validacion_existente = true
      break
    }
  }
  if (!validacion_existente) {
    const new_row = [
      mensaje_socket.cct, mensaje_socket.nom_escuela,
      mensaje_socket.nom_municipio, validar_turno(mensaje_socket.turno1),
      mensaje_socket.nombre_director ? mensaje_socket.nombre_director : "ACTUALIZÁNDOSE",
      `<td><button data-latitud="${mensaje_socket.latitud}" data-longitud="${mensaje_socket.longitud}" data-type="mapa_escuela" class="btn btn-warning control_escuela"><i class="bi bi-geo-alt-fill"></i></button></td>`,
      `<td><button id="row_${mensaje_socket.cct}" data-id="${mensaje_socket.id_escuela}" data-type="visualizar_escuela" class="btn btn-success control_escuela"><i class="bi bi-eye-fill"></i></button></td>`
    ]

    if (rol === 1) {
      new_row.push(`<td><button data-id="${mensaje_socket.id_escuela}" data-type="editar_escuela" class="btn btn-primary control_escuela"><i class="bi bi-pencil-square"></i></button></td>`)
      new_row.push(`<td><button data-id="${mensaje_socket.id_escuela}" data-type="eliminar_escuela" class="btn btn-danger control_escuela"><i class="bi bi-trash3-fill"></i></button></td>`)
    }

    escuelas_datatable.row.add(new_row).draw(false);
    notificacion_toastify("Nueva escuela registrada")
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
      notificacion_toastify("Escuela editada")
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
      notificacion_toastify("Escuela eliminada")
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