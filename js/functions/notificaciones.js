const notificacion_toastify = (mensaje) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
  }).showToast();
};

const notificacion_toastify_carga = () => {
  Toastify({
    text: "Cargando...",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
  }).showToast();
};

const notificacion_sweetalert = (tittle, message) => {
  Swal.fire({
    title: tittle,
    text: message,
    confirmButtonText: "Cerrar"
  })
}