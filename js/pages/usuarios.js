let escuelas_datatable
let usuarios_locales
let roles_locales
let usuario_actual

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
const pintar_tabla_usuarios = (usuarios) => {
  $("#container_table_usuarios").empty();
  escuelas_datatable = null;
  usuarios_locales = usuarios;

  let table = `<table class="table" id="table_usuarios">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre (s)</th>
                    <th>Apellidos</th>
                    <th>Visualizar</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody> `;

  usuarios.forEach((usuario) => {
    table += `<tr>
                <td>${usuario.usuario}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido_paterno} ${usuario.apellido_materno}</td>
                <td style="text-align: center">
                  <button data-id="${usuario.id_usuario}" data-type="visualizar_usuario" class="btn btn-success control_usuario">
                    <i class="bi bi-eye-fill"></i>
                  </button>
                </td>
                <td style="text-align: center">
                  <button data-id="${usuario.id_usuario}" data-type="editar_usuario" class="btn btn-primary control_usuario">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td style="text-align: center">
                  <button data-id="${usuario.id_usuario}" data-type="eliminar_usuario" class="btn btn-danger control_usuario">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>`;
  });

  table += ` </tbody> 
            </table>`;

  $("#container_table_usuarios").append(table);

  //Datatable
  escuelas_datatable = $("#table_usuarios").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
  });
}

const validar_form_usuario = () => {
  for (let i = 0; i < $(".validacion").length; i++) {
    if ($(`#${$(".validacion")[i].id}`).val() === "" || $(`#${$(".validacion")[i].id}`).val() === 0) {
      return false;
    }
  }
  return $(".error_input").length <= 0;
};

const validar_form_edit_usuario = () => {
  for (let i = 0; i < $(".validacion_edit").length; i++) {
    if ($(`#${$(".validacion_edit")[i].id}`).val() === "" || $(`#${$(".validacion_edit")[i].id}`).val() === 0) {
      return false;
    }
  }
  return $(".error_input").length <= 0;
};

const validar_campo_usuario = (campo, id) => {
  if (campo && $(`#${id}`).length > 0) {
    $(`#${id}`).val(campo);
  }
};

const visualizar_usuario = (usuario) => {
  $("#form_vis_usuario")[0].reset();

  validar_campo_usuario(usuario.usuario, "usuario_vis");
  validar_campo_usuario(usuario.correo, "correo_vis");
  validar_campo_usuario(usuario.telefono, "telefono_vis");
  validar_campo_usuario(usuario.nombre, "nombre_vis");
  validar_campo_usuario(usuario.apellido_paterno, "apellido_paterno_vis");
  validar_campo_usuario(usuario.apellido_materno, "apellido_materno_vis");
  validar_campo_usuario(usuario.rol_id, "rol_vis");

  $("#usuario_modificacion_vis").text(`Ultima modificación el ${usuario.fecha_modificacion} a las ${usuario.hora_modificacion} por ${usuario.usuario_nombre_modificacion} ${usuario.usuario_apellido_paterno_modificacion} ${usuario.usuario_apellido_materno_modificacion}`)

  $("#menu_usuarios").addClass("d-none");
  $("#visualizar_usuario").removeClass("d-none");
};

const editar_usuario = (usuario) => {
  $("#form_edit_usuario")[0].reset();

  validar_campo_usuario(usuario.usuario, "usuario_edit");
  validar_campo_usuario(usuario.correo, "correo_edit");
  validar_campo_usuario(usuario.telefono, "telefono_edit");
  validar_campo_usuario(usuario.nombre, "nombre_edit");
  validar_campo_usuario(usuario.apellido_paterno, "apellido_paterno_edit");
  validar_campo_usuario(usuario.apellido_materno, "apellido_materno_edit");
  validar_campo_usuario(usuario.rol_id, "rol_edit");

  $("#usuario_modificacion_edit").text(`Ultima modificación el ${usuario.fecha_modificacion} a las ${usuario.hora_modificacion} por ${usuario.usuario_nombre_modificacion} ${usuario.usuario_apellido_paterno_modificacion} ${usuario.usuario_apellido_materno_modificacion}`)

  $("#menu_usuarios").addClass("d-none");
  $("#editar_usuario").removeClass("d-none");
};

//Cargas usuarios
notificacion_carga()
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

//Validacion formulario
$.extend(window.Parsley.options, {
  focus: "first",
  excluded: "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
  triggerAfterFailure: "change blur",
  errorsContainer: function (element) {
  },
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
  let elNode = $(el)[0];
  if (elNode && !elNode.isValid()) {
    let rqeuiredValResult = elNode.validationResult.filter(function (vr) {
      return vr.assert.name === "required";
    });
    if (rqeuiredValResult.length > 0) {
      let fieldNode = $(elNode.element);
      let formGroupNode = fieldNode.closest(".form-group");
      let lblNode = formGroupNode.find(".form-label:first");
      if (lblNode.length > 0) {
        let errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        );
        if (errorNode.length > 0) {
          let lblText = lblNode.text();
          if (lblText) {
            errorNode.html(lblText + " es necesario.");
          }
        }
      }
    }
  }
});

$("#main").on("input", ".validacion_input", (event) => {
  const input = event.currentTarget
  const value = input.value
  const name = input.dataset.name
  const limit = Number.isInteger(parseInt(input.dataset.limit)) ? parseInt(input.dataset.limit) : 0
  const validacion_espacios = Boolean(input.dataset.validacionEspacios ? input.dataset.validacionEspacios : false)
  const validacion_contrasena = Boolean(input.dataset.validacionContrasena ? input.dataset.validacionContrasena : false)
  const validacion_numero = Boolean(input.dataset.validacionNumero ? input.dataset.validacionNumero : false)

  let mensajes_error_validacion_contrasena = ""
  let mensajes_error_validacion_numero = ""
  let numero_validacion_numero = ""

  $(`#container_${name}`).removeClass("is-invalid input_invalido")
  $(`#errores_${name}`).empty()

  if (validacion_espacios) {
    input.value = value.trim()
  }
  if (validacion_contrasena) {
    if (input.value.length < 8) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de ser de 8 caracteres</span><br>`
    if (!(value.match(/[0-9]+/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con un numero</span><br>`
    if (!(value.match(/[A-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra</span><br>`
    if (!(value.match(/[A-Z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra mayúscula</span><br>`
    if (!(value.match(/[a-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra minúscula</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_contrasena)
    if (mensajes_error_validacion_contrasena !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
  if (validacion_numero) {
    for (let val of value) if (Number.isInteger(parseInt(val))) numero_validacion_numero += val
    input.value = numero_validacion_numero.slice(0, limit)

    if (numero_validacion_numero.length > 0 && numero_validacion_numero.length < limit) mensajes_error_validacion_numero += `<span class="error_input">Debe de ser de ${limit} números</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_numero)
    if (mensajes_error_validacion_numero !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
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
  if (validar_form_usuario()) {
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
        request_post("/api/v1/usuarios/consultar_usuarios", {}).then((response) => {
          const {success, response: usuarios} = response;

          if (success) {
            pintar_tabla_usuarios(usuarios)
          }
        })

        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Usuario registrado",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

        $("#form_nuevo_usuario")[0].reset();
        $(".validacion_input").empty()

        $("#menu_usuarios").removeClass("d-none");
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
          visualizar_usuario(usuario);
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
          editar_usuario(usuario);
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
              request_post("/api/v1/usuarios/consultar_usuarios", {}).then((response) => {
                const {success, response: usuarios} = response;

                if (success) {
                  pintar_tabla_usuarios(usuarios)
                }
              })

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
  $("#visualizar_usuario").addClass("d-none");
});

//Cancelar editar usuario
$("#btn_cancelar_edit_usuario").click(() => {
  $("#form_edit_usuario")[0].reset();

  $("#menu_usuarios").removeClass("d-none");
  $("#editar_usuario").addClass("d-none");
});

//Guardar editar usuario
$("#form_edit_usuario").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_usuario").click(() => {
  if (validar_form_edit_usuario()) {
    notificacion_carga();
    request_post("/api/v1/usuarios/editar_usuario", {
      "id_usuario": usuario_actual,
      "correo": $("#correo_edit").val(),
      "telefono": $("#telefono_edit").val(),
      "rol_id": $("#rol_edit").val(),

    }).then((response) => {
      const {success, message} = response;

      if (success) {
        request_post("/api/v1/usuarios/consultar_usuarios", {}).then((response) => {
          const {success, response: usuarios} = response;

          if (success) {
            pintar_tabla_usuarios(usuarios);
          }
        });

        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Usuario actualizado",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

        $("#form_edit_usuario")[0].reset();

        $("#menu_usuarios").removeClass("d-none");
        $("#editar_usuario").addClass("d-none");
      } else {
        Swal.fire("Error", message, "error");
      }
    });
  }
});

