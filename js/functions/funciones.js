const comprimir_imagen = (img, calidad) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const imagen = new Image();
    imagen.onload = () => {
      canvas.width = imagen.width;
      canvas.height = imagen.height;
      canvas.getContext("2d").drawImage(imagen, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob === null) {
            return reject(blob);
          } else {
            resolve(blob);
          }
        },
        "image/jpeg",
        calidad / 100
      );
    };
    imagen.src = URL.createObjectURL(img);
  });
};

const validar_img = (img, id) => {
  $(`#${id}`).empty()
  $(`#${id}`).addClass("d-none")

  if (img && img !== "") {
    $("<img>")
      .attr('src', `${img}`)
      .on('load', () => {
        $(`#${id}`).append(`<img src='${img}' style="height: 20rem;" class="img-fluid" alt="Imagen escuela">`)
        $(`#${id}`).removeClass("d-none")
      })
      .on('error', () => {
        // console.log("Imagen no encontrada")
      });
  }
}
