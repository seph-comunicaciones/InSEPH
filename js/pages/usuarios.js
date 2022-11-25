let usuarios_datatable
let usuarios_locales
let roles_locales
let usuario_actual = null
let rol = false
let usuario = 0

//Funciones
const pintar_tabla_usuarios = (usuarios) => {
  $("#container_table_usuarios").empty();
  usuarios_datatable = null;
  usuarios_locales = usuarios;

  let table = `<table class="table" style="text-align: center" id="table_usuarios">
                <thead>
                  <tr>
                    <th style="text-align: center">Usuario</th>
                    <th style="text-align: center">Nombre (s)</th>
                    <th style="text-align: center">Apellidos</th>
                    <th style="text-align: center">Visualizar</th>
                    <th style="text-align: center">Editar</th>
                    <th style="text-align: center">Eliminar</th>
                  </tr>
                </thead>
                <tbody> `;

  usuarios.forEach((usuario) => {
    table += `<tr>
                <td>${usuario.usuario}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido_paterno} ${usuario.apellido_materno}</td>
                <td><button data-id="${usuario.id_usuario}" data-type="visualizar_usuario" class="btn btn-success control_usuario"><i class="bi bi-eye-fill"></i></button></td>
                <td><button data-id="${usuario.id_usuario}" data-type="editar_usuario" class="btn btn-primary control_usuario"><i class="bi bi-pencil-square"></i></button></td>
                <td><button id="row_${usuario.id_usuario}" data-id="${usuario.id_usuario}" data-type="eliminar_usuario" class="btn btn-danger control_usuario"><i class="bi bi-trash3-fill"></i></button></td>
              </tr>`;
  });

  table += ` </tbody> 
            </table>`;

  $("#container_table_usuarios").append(table);

  //Datatable
  usuarios_datatable = $("#table_usuarios").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
}

const vista_visualizar_usuario = (usuario) => {
  $("#form_vis_usuario")[0].reset();

  validar_campo(usuario.usuario, "usuario_vis");
  validar_campo(usuario.correo, "correo_vis");
  validar_campo(usuario.telefono, "telefono_vis");
  validar_campo(usuario.nombre, "nombre_vis");
  validar_campo(usuario.apellido_paterno, "apellido_paterno_vis");
  validar_campo(usuario.apellido_materno, "apellido_materno_vis");
  validar_campo(usuario.rol_id, "rol_vis");

  $("#usuario_modificacion_vis").text(`Ultima modificación el ${usuario.fecha_modificacion} a las ${usuario.hora_modificacion} por ${usuario.usuario_nombre_modificacion} ${usuario.usuario_apellido_paterno_modificacion} ${usuario.usuario_apellido_materno_modificacion}`)

  $("#menu_usuarios").addClass("d-none");
  $("#visualizar_usuario").removeClass("d-none");
};

const vista_editar_usuario = (usuario) => {
  $("#form_edit_usuario")[0].reset();

  validar_campo(usuario.usuario, "usuario_edit");
  validar_campo(usuario.correo, "correo_edit");
  validar_campo(usuario.telefono, "telefono_edit");
  validar_campo(usuario.nombre, "nombre_edit");
  validar_campo(usuario.apellido_paterno, "apellido_paterno_edit");
  validar_campo(usuario.apellido_materno, "apellido_materno_edit");
  validar_campo(usuario.rol_id, "rol_edit");

  $("#usuario_modificacion_edit").text(`Ultima modificación el ${usuario.fecha_modificacion} a las ${usuario.hora_modificacion} por ${usuario.usuario_nombre_modificacion} ${usuario.usuario_apellido_paterno_modificacion} ${usuario.usuario_apellido_materno_modificacion}`)

  $("#menu_usuarios").addClass("d-none");
  $("#editar_usuario").removeClass("d-none");
};

//Cargas usuarios
notificacion_carga()
request_post("/api/v1/usuarios/consultar_rol_usuario", {}).then((response) => {
  const {success, message, response: {rol_id, id_usuario}} = response;

  if (success) {
    //Cargar el rol
    rol = rol_id
    usuario = id_usuario

    request_post("/api/v1/usuarios/consultar_usuarios", {}).then((response) => {
      const {success, response: usuarios} = response;

      if (success) {
        request_post("/api/v1/usuarios/consultar_roles", {}).then((response) => {
          const {success, response: roles} = response;

          if (success) {
            roles_locales = roles;

            $(`#rol`).empty();
            $(`#rol_edit`).empty();
            $(`#rol_vis`).empty();
            let opciones_select = `<option value="">Elige una opción</option> `;

            roles.forEach((rol) => (opciones_select += ` <option value="${rol.id_rol}">${rol.nom_rol}</option> `));

            $(`#rol`).append(opciones_select);
            $(`#rol_edit`).append(opciones_select);
            $(`#rol_vis`).append(opciones_select);
          }
        })

        notificacion("Usuarios consultados")
        pintar_tabla_usuarios(usuarios)
      }
    })
  } else {
    Swal.fire("Error", message, "error");
  }
})

//Agregar nuevo usuario
$("#btn_nuevo_usuario").click(() => {
  $("#form_nuevo_usuario")[0].reset();
  $(".validacion_input").empty()

  $("#menu_usuarios").addClass("d-none");
  $("#nuevo_usuario").removeClass("d-none");
});

//Guardar nuevo usuario
$("#form_nuevo_usuario").on("submit", (event) => event.preventDefault());

$("#btn_guardar_usuario").click(() => {
  if (validar_form()) {
    notificacion_carga();
    request_post("/api/v1/usuarios/agregar_usuario", {
      "usuario": $("#usuario").val(),
      "correo": $("#correo").val(),
      "telefono": $("#telefono").val() > 0 ? $("#telefono").val() : "",
      "contrasena": $("#contrasena").val(),
      "nombre": $("#nombre").val(),
      "apellido_paterno": $("#apellido_paterno").val(),
      "apellido_materno": $("#apellido_materno").val(),
      "rol_id": $("#rol").val()
    }).then((response) => {
      const {success, message} = response;

      if (success) {
        $("#form_nuevo_usuario")[0].reset();
        $(".validacion_input").empty()

        $("#menu_usuarios").removeClass("d-none");
        usuario_actual = null
        $("#nuevo_usuario").addClass("d-none");
      } else {
        Swal.fire("Error", message, "error");
      }
    });
  }
});

//Cancelar nuevo usuario
$("#btn_cancelar_usuario").click(() => {
  $("#form_nuevo_usuario")[0].reset();
  $(".validacion_input").empty()

  $("#nuevo_usuario").addClass("d-none");
  $("#menu_usuarios").removeClass("d-none");
  usuario_actual = null
});

//Controles usuarios
$("#main").on("click", ".control_usuario", (event) => {
  const button = event.currentTarget;
  const type = button.dataset.type;
  const id = button.dataset.id;

  usuario_actual = id

  switch (type) {
    case "visualizar_usuario":
      notificacion_carga();
      request_post("/api/v1/usuarios/consultar_usuario", {
        id_usuario: id,
      }).then((response) => {
        const {success, message, response: usuario} = response;

        if (success) {
          notificacion("Usuario consultado");
          vista_visualizar_usuario(usuario);
        } else {
          Swal.fire("Error", message, "error");
        }
      });
      break
    case "editar_usuario":
      notificacion_carga();
      request_post("/api/v1/usuarios/consultar_usuario", {
        id_usuario: id,
      }).then((response) => {
        const {success, message, response: usuario} = response;

        if (success) {
          notificacion("Usuario consultado");
          vista_editar_usuario(usuario);
        } else {
          Swal.fire("Error", message, "error");
        }
      });
      break
    case "eliminar_usuario":
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

          request_post("/api/v1/usuarios/eliminar_usuario", {
            id_usuario: id,
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
      break
  }
})

//Regresar vista usuario
$("#btn_regresar_vis_usuario").click(() => {
  $("#form_vis_usuario")[0].reset();

  $("#menu_usuarios").removeClass("d-none");
  usuario_actual = null
  $("#visualizar_usuario").addClass("d-none");
});

//Cancelar editar usuario
$("#btn_cancelar_edit_usuario").click(() => {
  $("#form_edit_usuario")[0].reset();

  $("#menu_usuarios").removeClass("d-none");
  usuario_actual = null
  $("#editar_usuario").addClass("d-none");
});

//Guardar editar usuario
$("#form_edit_usuario").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_usuario").click(() => {
  if (validar_form_edit()) {
    notificacion_carga();
    request_post("/api/v1/usuarios/editar_usuario", {
      "id_usuario": usuario_actual,
      "correo": $("#correo_edit").val(),
      "telefono": $("#telefono_edit").val(),
      "rol_id": $("#rol_edit").val(),

    }).then((response) => {
      const {success, message} = response;

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Usuario actualizado",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

        $("#form_edit_usuario")[0].reset();

        $("#menu_usuarios").removeClass("d-none");
        usuario_actual = null
        $("#editar_usuario").addClass("d-none");
      } else {
        Swal.fire("Error", message, "error");
      }
    });
  }
});

//Socket
const socket = io.connect();

socket.on("agregar_usuario", mensaje_socket => {
  console.log("agregar_usuario")
  let validacion_existente = false
  for (let i = 0; i < usuarios_datatable.rows().data().length; i++) {
    if (usuarios_datatable.data()[i][0] === mensaje_socket.usuario) {
      validacion_existente = true
      break
    }
  }

  if (!validacion_existente) {
    usuarios_datatable.row.add([
      mensaje_socket.usuario,
      mensaje_socket.nombre,
      `${mensaje_socket.apellido_materno} ${mensaje_socket.apellido_paterno}`,
      `<td><button data-id="${mensaje_socket.id_usuario}" data-type="visualizar_usuario" class="btn btn-success control_usuario"><i class="bi bi-eye-fill"></i></button></td>`,
      `<td><button data-id="${mensaje_socket.id_usuario}" data-type="editar_usuario" class="btn btn-primary control_usuario"><i class="bi bi-pencil-square"></i></button></td>`,
      `<td><button id="row_${mensaje_socket.id_usuario}" data-id="${mensaje_socket.id_usuario}" data-type="eliminar_usuario" class="btn btn-danger control_usuario"><i class="bi bi-trash3-fill"></i></button></td>`,
    ]).draw(false);
    notificacion("Nuevo usuario registrado")
  }
});

socket.on("editar_usuario", mensaje_socket => {
  console.log("editar_usuario")
  for (let i = 0; i < usuarios_datatable.rows().data().length; i++) {
    if (usuarios_datatable.data()[i][0] === mensaje_socket.usuario) {
      usuarios_datatable.cell({row: i, column: 0}).data(mensaje_socket.usuario);
      usuarios_datatable.cell({row: i, column: 1}).data(mensaje_socket.nombre);
      usuarios_datatable.cell({row: i, column: 2}).data(`${mensaje_socket.apellido_materno} ${mensaje_socket.apellido_paterno}`);
      notificacion("Usuario editado")
      break
    }
  }

  if (usuario_actual === mensaje_socket.id_usuario.toString() && ($("#menu_usuarios").attr("class").match("d-none") || $("#visualizar_usuario").attr("class").match("d-none"))) {
    request_post("/api/v1/usuarios/consultar_usuario", {
      id_usuario: usuario_actual,
    }).then((response) => {
      const {success, message, response: usuario} = response;

      if (success && $("#menu_usuarios").attr("class").match("d-none")) {
        if ($("#editar_usuario").attr("class").match("d-none")) {
          vista_visualizar_usuario(usuario);
        } else if ($("#visualizar_usuario").attr("class").match("d-none")) {
          vista_editar_usuario(usuario);
        }
      }
    })
  }

  if (mensaje_socket.id_usuario.toString() === usuario.toString()) {
    request_get("/api/v1/usuarios/validar_session").then((response) => {
      console.log(response);
    })
  }
});

socket.on("eliminar_usuario", mensaje_socket => {
  console.log("eliminar_usuario")
  for (let i = 0; i < usuarios_datatable.rows().data().length; i++) {
    if (usuarios_datatable.data()[i][0] === mensaje_socket.usuario) {
      usuarios_datatable.row($(`#row_${mensaje_socket.id_usuario}`).parents("tr")).remove().draw(false)
      notificacion("Usuario eliminado")
      break
    }
  }

  if (usuario_actual === mensaje_socket.id_usuario.toString()) {
    if ($("#menu_usuarios").attr("class").match("d-none")) {
      if ($("#editar_usuario").attr("class").match("d-none")) {
        $("#menu_usuarios").removeClass("d-none");
        $("#visualizar_usuario").addClass("d-none");
        usuario_actual = null
      } else if ($("#visualizar_usuario").attr("class").match("d-none")) {
        $("#menu_usuarios").removeClass("d-none");
        $("#editar_usuario").addClass("d-none");
        usuario_actual = null
      }
    }
  }

  if (mensaje_socket.id_usuario.toString() === usuario.toString()) {
    request_get("/api/v1/usuarios/validar_session").then((response) => {
      console.log(response);
    })
  }
});
