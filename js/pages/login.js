//Login
$("#form_login").on("submit", (event) => event.preventDefault());

$("#btn_login").click(() => {
  if ($("#usuario").val().length > 0 && $("#password").val().length > 0) {
    Toastify({
      text: "Cargando...",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
    }).showToast();
    request_post("/api/v1/usuarios/validar_usuario", {
      "usuario": $("#usuario").val(),
      "contrasena": $("#password").val()
    }).then((response) => {
      const {success, message} = response;
      if (success) {
        const a = document.createElement("a");
        a.href = "dashboard.html";
        a.click();
      } else {
        $("#form_login")[0].reset()
        Toastify({
          text: message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
        }).showToast();
      }
    })
  }
});
