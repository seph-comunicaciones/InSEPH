const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const {consultar_escuelas, agregar_escuela, consultar_escuela, aliminar_escuela, editar_escuela} = require("./js/services/escuelas");
const {consultar_municipios} = require("./js/services/municipios");
const {consultar_turnos} = require("./js/services/turnos");
const {consultar_modelos} = require("./js/services/modelos");
const {consultar_sostenimientos} = require("./js/services/sostenimientos");
const {consultar_controles} = require("./js/services/controles");
const {consultar_niveles, consultar_servicios, consultar_tipos} = require("./js/services/sistemas_educativos");
const {consultar_usuario} = require("./js/services/usuarios");

const app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/extensions", express.static(__dirname + "/extensions"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/css", express.static(__dirname + "/css"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

//Session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "575c4bd0-2e5c-4102-a1cf-c49b1ecb6b3b",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
      id_usuario: 0,
      login: false,
    },
  })
);

let my_session;

app.use((request, response, next) => {
  my_session = request.session;
  my_session.login = my_session.cookie.login ? my_session.cookie.login : my_session.login;
  my_session.id_usuario = my_session.cookie.id_usuario ? my_session.cookie.id_usuario : my_session.id_usuario;
  next();
});

const routes_session = (route, session_true, session_false, log_out) => (request, response) => {
  if (log_out) {
    request.session.login = false;
    request.session.id_usuario = 0;
  }

  console.log(request.session);

  if (request.session.login) {
    response.sendFile(__dirname + `/public/${session_true}`);
  } else {
    response.sendFile(__dirname + `/public/${session_false}`);
  }
};

//Escuelas
app.post("/api/v1/escuelas/consultar_escuelas", consultar_escuelas);
app.post("/api/v1/escuelas/consultar_escuela", consultar_escuela);
app.post("/api/v1/escuelas/agregar_escuela", agregar_escuela);
app.post("/api/v1/escuelas/editar_escuela", editar_escuela);
app.post("/api/v1/escuelas/aliminar_escuela", aliminar_escuela);

//Sistemas educativos
app.get("/api/v1/sistemas_educativos/consultar_niveles", consultar_niveles);
app.get("/api/v1/sistemas_educativos/consultar_servicios", consultar_servicios);
app.get("/api/v1/sistemas_educativos/consultar_tipos", consultar_tipos);

//Municipios
app.get("/api/v1/municipios/consultar_municipios", consultar_municipios);

//Turnos
app.get("/api/v1/turnos/consultar_turnos", consultar_turnos);

//Modelos educativos
app.get("/api/v1/modelos/consultar_modelos", consultar_modelos);

//Sostenimientos educativos
app.get("/api/v1/sostenimientos/consultar_sostenimientos", consultar_sostenimientos);

//Controles
app.get("/api/v1/controles/consultar_controles", consultar_controles);

//Usuario
app.post("/api/v1/usuarios/consultar_usuario", consultar_usuario);


//Carga de vistas
app.get("/", routes_session("/", "dashboard.html", "login.html", false));
app.get("/login.html", routes_session("/login.html", "dashboard.html", "login.html", false));
app.get("/logout.html", routes_session("/out.html", "login.html", "login.html", true));
app.get("/dashboard.html", routes_session("/dashboard.html", "dashboard.html", "login.html", false));
app.get("/escuelas.html", routes_session("/escuelas.html", "escuelas.html", "login.html", false));
app.get("/usuarios.html", routes_session("/usuarios.html", "usuarios.html", "login.html", false));

app.use((request, response) => {
  response.status(404);

  console.log("Not found")
  response.sendFile(__dirname + `/public/error-404.html`);
});