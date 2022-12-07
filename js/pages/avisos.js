//Funciones
const pintar_avisos = (avisos) => {
  avisos.forEach((aviso) => {
    const {id_avisos, titulo, informacion} = aviso

    $("#menu_avisos").empty()

    $("#menu_avisos").append(`<section class="section" id="id_aviso_${id_avisos}">
                                <div class="card">
                                  <div class="card-header">${titulo}</div>
                                  <div class="card-body">${informacion}</div>
                                </div>
                              </section>`)
  })
}

//Carga de avisos
notificacion_toastify_carga()
request_post("/api/v1/avisos/consultar_avisos", {}).then((response) => {
  const {success, message, response: avisos} = response;

  if (success) {
    notificacion_toastify("Avisos consultados")
    pintar_avisos(avisos)

  } else {
    Swal.fire("Error", message, "error");
  }
})