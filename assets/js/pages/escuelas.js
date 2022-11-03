const municipios = ["Pachuca de Soto", "Huehetla", "Tulancingo"];

//Validar que el formulario este lleno para enviar
const validar_form_escuela = () => {
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

const validar_form_edit_escuela = () => {
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

//Datatable
let jquery_datatable = $("#table_escuelas").DataTable({
  language: {
    url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
  },
});

//Agregar nueva escuela
$("#btn_nueva_escuela").click(() => {
  $("#form_nueva_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").addClass("d-none");
  $("#nueva_escuela").removeClass("d-none");
});

// Filepond: Image Preview
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

let img_escuela = FilePond.create(document.querySelector("#img_escuela"), {
  credits: null,
  labelIdle: "Selecciona o arrastra la imagen de la escuela",
});

let img_escuela_edit = FilePond.create(
  document.querySelector("#img_escuela_edit"),
  {
    credits: null,
    labelIdle: "Selecciona o arrastra la imagen de la escuela",
  }
);

//On change tipo de educación
$("#educacion").on("change", () => {
  $("#contenedor_educacion").addClass("d-none");
  $("#contenedor_educacion").empty();

  if ($("#educacion").val() === "Básica") {
    $("#contenedor_educacion").removeClass("d-none");
    $("#contenedor_educacion").append(`<div class="form-group mandatory">
                                        <label for="educacion" class="form-label"
                                          >Nivel educativo
                                        </label>
                                        <select
                                          id="educacion"
                                          name="educacion"
                                          class="form-select"
                                          data-parsley-required="true"
                                        >
                                          <option value="">Elige una opción</option>
                                          <option value="Preescolar">Preescolar</option>
                                          <option value="Primaria">Primaria</option>
                                          <option value="Secundaria">Secundaria</option>
                                        </select>
                                      </div>`);
  }
});

//On change totales alumnos
$("#alumnos_mujeres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#alumnos_hombres").val())) === true
        ? parseInt($("#alumnos_hombres").val())
        : 0)
  );
});

$("#alumnos_hombres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#alumnos_mujeres").val())) === true
        ? parseInt($("#alumnos_mujeres").val())
        : 0)
  );
});

//On change totales docentes
$("#docentes_mujeres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#docentes_hombres").val())) === true
        ? parseInt($("#docentes_hombres").val())
        : 0)
  );
});

$("#docentes_hombres").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#docentes_mujeres").val())) === true
        ? parseInt($("#docentes_mujeres").val())
        : 0)
  );
});

//Guardar escuela
$("#form_nueva_escuela").on("submit", (event) => event.preventDefault());

$("#btn_guardar_escuela").click(() => {
  if (validar_form_escuela()) {
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
  }
});

//Cancelar escuela
$("#btn_cancelar_escuela").click(() => {
  $("#form_nueva_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  $("#nueva_escuela").addClass("d-none");
});

//Editar escuelas
$("#main").on("click", ".editar_escuela", () => {
  $("#form_edit_escuela")[0].reset();
  img_escuela_edit.removeFile();

  $("#menu_escuelas").addClass("d-none");
  $("#editar_escuela").removeClass("d-none");
});

//On change tipo de educación
$("#educacion_edit").on("change", () => {
  $("#contenedor_educacion_edit").addClass("d-none");
  $("#contenedor_educacion_edit").empty();

  if ($("#educacion_edit").val() === "Básica") {
    $("#contenedor_educacion_edit").removeClass("d-none");
    $("#contenedor_educacion_edit").append(`<div class="form-group mandatory">
                                        <label for="educacion_edit" class="form-label"
                                          >Nivel educativo
                                        </label>
                                        <select
                                          id="educacion_edit"
                                          name="educacion_edit"
                                          class="form-select"
                                          data-parsley-required="true"
                                        >
                                          <option value="">Elige una opción</option>
                                          <option value="Preescolar">Preescolar</option>
                                          <option value="Primaria">Primaria</option>
                                          <option value="Secundaria">Secundaria</option>
                                        </select>
                                      </div>`);
  }
});

//On change totales alumnos
$("#alumnos_mujeres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales_edit").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#alumnos_hombres_edit").val())) === true
        ? parseInt($("#alumnos_hombres_edit").val())
        : 0)
  );
});

$("#alumnos_hombres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#alumnos_totales_edit").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#alumnos_mujeres_edit").val())) === true
        ? parseInt($("#alumnos_mujeres_edit").val())
        : 0)
  );
});

//On change totales docentes
$("#docentes_mujeres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales_edit").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#docentes_hombres_edit").val())) === true
        ? parseInt($("#docentes_hombres_edit").val())
        : 0)
  );
});

$("#docentes_hombres_edit").on("input", (event) => {
  const input_val = event.currentTarget.value;
  $("#docentes_totales_edit").val(
    parseInt(input_val) +
      (Number.isInteger(parseInt($("#docentes_mujeres_edit").val())) === true
        ? parseInt($("#docentes_mujeres_edit").val())
        : 0)
  );
});

//Cancelar escuela
$("#btn_cancelar_edit_escuela").click(() => {
  $("#form_edit_escuela")[0].reset();
  img_escuela.removeFile();

  $("#menu_escuelas").removeClass("d-none");
  $("#editar_escuela").addClass("d-none");
});

//Editar escuela
$("#form_edit_escuela").on("submit", (event) => event.preventDefault());

$("#btn_guardar_edit_escuela").click(() => {
  if (validar_form_edit_escuela()) {
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: "Escuela actualizada",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });

    $("#form_nueva_escuela")[0].reset();
    img_escuela.removeFile();

    $("#menu_escuelas").removeClass("d-none");
    $("#nueva_escuela").addClass("d-none");
  }
});

//Cancelar escuelas
$("#main").on("click", ".eliminar_escuela", (event) => {
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
      Swal.fire("Eliminado", "La escuela ha sido eliminada.", "success");
    }
  });
});
