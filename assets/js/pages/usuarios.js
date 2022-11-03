//Validar que el formulario este lleno para enviar
const validar_form_usuario = () => {
  for (let i = 0; i < $(".validacion").length; i++) {
    if (
      $(`#${$(".validacion")[i].id}`).val() === "" ||
      $(`#${$(".validacion")[i].id}`).val() === 0
    ) {
      return false;
    }
  }

  return true;
};

const validar_form_edit_usuario = () => {
  for (let i = 0; i < $(".validacion_edit").length; i++) {
    if (
      $(`#${$(".validacion_edit")[i].id}`).val() === "" ||
      $(`#${$(".validacion_edit")[i].id}`).val() === 0
    ) {
      return false;
    }
  }

  return true;
};

//Datatable
let jquery_datatable = $("#table_usuarios").DataTable({
  language: {
    url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
  },
});

//Validacion formulario
$.extend(window.Parsley.options, {
  focus: "first",
  excluded:
    "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
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
        var errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        );
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

//Agregar nuevo usuario
$("#btn_nuevo_usuario").click(() => {
  $("#form_nuevo_usuario")[0].reset();

  $("#menu_usuarios").addClass("d-none");
  $("#nuevo_usuario").removeClass("d-none");
});

//Guardar usuario
$("#form_nuevo_usuario").on("submit", (event) => event.preventDefault());

$("#btn_guardar_usuario").click(() => {
  if (validar_form_usuario()) {
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: "Escuela registrada",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });

    $("#form_nuevo_usuario")[0].reset();

    $("#menu_usuarios").removeClass("d-none");
    $("#nuevo_usuario").addClass("d-none");
  }
});

//Cancelar nuevo usuario
$("#btn_cancelar_usuario").click(() => {
  $("#form_nuevo_usuario")[0].reset();

  $("#nuevo_usuario").addClass("d-none");
  $("#menu_usuarios").removeClass("d-none");
});

//Eliminar usuarios
$("#main").on("click", ".eliminar_usuario", (event) => {
  const button = event.currentTarget;

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
      Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
    }
  });
});

//Editar usuarios
$("#main").on("click", ".editar_usuario", () => {
  $("#form_edit_usuario")[0].reset();

  $("#menu_usuarios").addClass("d-none");
  $("#editar_usuario").removeClass("d-none");
});

//Editar escuela
$("#form_edit_usuario").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_usuario").click(() => {
  if (validar_form_edit_usuario()) {
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
  }
});

//Cancelar escuela
$("#btn_cancelar_edit_usuario").click(() => {
  $("#form_edit_usuario")[0].reset();

  $("#menu_usuarios").removeClass("d-none");
  $("#editar_usuario").addClass("d-none");
});
