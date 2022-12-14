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
        let errorNode = formGroupNode.find("div.parsley-error span[class*=parsley-]");
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
  const validacion_clave = Boolean(input.dataset.validacionClave ? input.dataset.validacionClave : false)

  let mensajes_error_validacion_contrasena = ""
  let mensajes_error_validacion_clave = ""
  let mensajes_error_validacion_numero = ""
  let numero_validacion = ""

  $(`#container_${name}`).removeClass("is-invalid input_invalido")
  $(`#errores_${name}`).empty()

  if (validacion_espacios) {
    input.value = value.trim()
  }
  if (validacion_contrasena) {
    if (limit !== 0 && input.value.length < limit) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de ser de ${limit} caracteres</span><br>`
    if (!(value.match(/[0-9]+/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con un numero</span><br>`
    if (!(value.match(/[A-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra</span><br>`
    if (!(value.match(/[A-Z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra may??scula</span><br>`
    if (!(value.match(/[a-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra min??scula</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_contrasena)
    if (mensajes_error_validacion_contrasena !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
  if (validacion_numero) {
    for (let val of value) if (Number.isInteger(parseInt(val))) numero_validacion += val
    input.value = limit !== 0 ? numero_validacion.slice(0, limit) : numero_validacion;

    if (limit !== 0 && numero_validacion.length > 0 && numero_validacion.length < limit) mensajes_error_validacion_numero += `<span class="error_input">Debe de ser de ${limit} n??meros</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_numero)
    if (mensajes_error_validacion_numero !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
  if (validacion_clave) {
    input.value = value.slice(0, limit).toUpperCase()

    if (value.length < limit) mensajes_error_validacion_clave += `<span class="error_input">Debe de ser de ${limit} caracteres</span><br>`
    if (value.match(/[.,\/#!$%^&*;:{}=\-_`~()??????"???]/)) mensajes_error_validacion_clave += `<span class="error_input">No debe de contener signos de puntaci??n</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_clave)
    if (mensajes_error_validacion_clave !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
})

const validar_form = () => {
  for (let i = 0; i < $(".validacion").length; i++) {
    if ($(`#${$(".validacion")[i].id}`).val() === "" || $(`#${$(".validacion")[i].id}`).val() === 0) {
      return false;
    }
  }
  return $(".error_input").length <= 0;
};

const validar_form_edit = () => {
  for (let i = 0; i < $(".validacion_edit").length; i++) {
    if ($(`#${$(".validacion_edit")[i].id}`).val() === "" || $(`#${$(".validacion_edit")[i].id}`).val() === 0) {
      return false;
    }
  }
  return $(".error_input").length <= 0;
};

const validar_campo = (campo, id) => {
  if (campo !== null || $(`#${id}`).length > 0) {
    $(`#${id}`).val(campo);
  }
};