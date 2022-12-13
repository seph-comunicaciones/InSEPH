//Funciones
const procesar_informacion = (informacion) => {
  informacion = informacion.replaceAll("\n", "")
  const llaves = ["<inicio_elemento_lista>", "<fin_elemento_lista>", "<inicio_sub_elemento_lista>", "<fin_sub_elemento_lista>", "<inicio_titulo>", "<fin_titulo>", "<sub_elemento_lista>", "<elemento_lista>", "<inicio_imagen>", "<fin_imagen>"]
  const llaves_replace = ["<ul>", "</ul>", "<ul>", "</ul>", "<h2>", "</h2>", "<li>", "<li>", `<div style="display: flex;align-items: center;justify-content: center; padding: 1rem;"><img class="img-fluid w-100" style="max-width: 70% !important;" src="${window.location.origin}`, "\" alt=\"Alineación de los instrumentos de planeación\"></div>"]

  for (let i = 0; i < llaves.length; i++) {
    informacion = informacion.replaceAll(llaves[i], llaves_replace[i])
  }

  return informacion
}

const pintar_avisos = (avisos) => {
  avisos.forEach((aviso) => {
    const {id_avisos, titulo, sub_titulo, informacion} = aviso

    $("#menu_avisos").empty()

    $("#menu_avisos").append(`<section class="section" id="id_aviso_${id_avisos}">
                                <div class="card">
                                  <div class="card-header">
                                    <h2>${titulo}</h2>
                                    <p>${sub_titulo}</p>
                                  </div>
                                  <div class="card-body">${procesar_informacion(informacion)}</div>
                                </div>
                              </section>`)
  })
}


//Carga de avisos
notificacion_toastify_carga()
request_post("/api/v1/avisos/consultar_avisos", {
  "informacion": true
}).then((response) => {
  const {success, message, response: avisos} = response;

  if (success) {
    notificacion_toastify("Avisos consultados")
    pintar_avisos(avisos)

  }
})