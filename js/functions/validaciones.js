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
    if (input.value.length < 8) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de ser de 8 caracteres</span><br>`
    if (!(value.match(/[0-9]+/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con un numero</span><br>`
    if (!(value.match(/[A-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra</span><br>`
    if (!(value.match(/[A-Z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra mayúscula</span><br>`
    if (!(value.match(/[a-z]/))) mensajes_error_validacion_contrasena += `<span class="error_input">Debe de contar por lo menos con una letra minúscula</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_contrasena)
    if (mensajes_error_validacion_contrasena !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
  if (validacion_numero) {
    for (let val of value) if (Number.isInteger(parseInt(val))) numero_validacion += val
    input.value = limit !== 0 ? numero_validacion.slice(0, limit) : numero_validacion;

    if (limit !== 0 && numero_validacion.length > 0 && numero_validacion.length < limit) mensajes_error_validacion_numero += `<span class="error_input">Debe de ser de ${limit} números</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_numero)
    if (mensajes_error_validacion_numero !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
  if (validacion_clave) {
    input.value = value.slice(0, limit).toUpperCase()

    if (value.length < limit) mensajes_error_validacion_clave += `<span class="error_input">Debe de ser de ${limit} caracteres</span><br>`
    if (value.match(/[.,\/#!$%^&*;:{}=\-_`~()”“"…]/)) mensajes_error_validacion_clave += `<span class="error_input">No debe de contener signos de puntación</span><br>`

    $(`#errores_${name}`).append(mensajes_error_validacion_clave)
    if (mensajes_error_validacion_clave !== "") $(`#container_${name}`).addClass("is-invalid input_invalido")
  }
})