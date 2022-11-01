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

  $("#menu_escuelas").addClass("d-none");
  $("#nueva_escuela").removeClass("d-none");
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
        // change default error message to include field label
        var errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        );
        if (errorNode.length > 0) {
          var lblText = lblNode.text();
          if (lblText) {
            errorNode.html(lblText + " is required.");
          }
        }
      }
    }
  }
});

// Filepond: Image Preview
FilePond.create(document.querySelector(".image-preview-filepond"), {
  credits: null,
  labelIdle: "Selecciona o arrastra la imagen de la escuela",
  allowImagePreview: true,
  allowImageFilter: true,
  allowImageExifOrientation: false,
  allowImageCrop: false,
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      resolve(type);
    }),
});

//Cancelar escuela
$("#btn_cancelar_escuela").click(() => {
  $("#menu_escuelas").removeClass("d-none");
  $("#nueva_escuela").addClass("d-none");
});

//Eliminar escuelas
$("#main").on("click", ".eliminar_escuela", (event) => {
  button = event.currentTarget;

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
      Swal.fire("Elmiinado!", "La escuela ha sido eliminada.", "success");
    }
  });
});
