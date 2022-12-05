const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const socket = new Server(server);
require("dotenv").config()

const {routes_session} = require("./js/services/servicios");
const {consultar_datos_dashboard} = require("./js/services/dashboard");
const {consultar_escuelas, consultar_escuela, eliminar_escuela, editar_escuela, agregar_escuela} = require("./js/services/escuela");
const {subir_archivo} = require("./js/services/archivo")
const {editar_usuario, validar_usuario, consultar_usuarios, consultar_usuario, consultar_rol_usuario, consultar_roles, agregar_usuario, eliminar_usuario, validacion_session} = require("./js/services/usuario");
const {consultar_niveles, consultar_servicios, consultar_tipos, consultar_municipios, consultar_turnos, consultar_modelos, consultar_sostenimientos, consultar_controles} = require("./js/services/catalogo");
const {consultar_indicadores_internacionales, consultar_indicadores_nacionales, consultar_indicadores_institucionales, consultar_indicadores_estatales} = require("./js/services/indicadores");

const {PORT} = process.env
let my_session;

app.use("/js", express.static(__dirname + "/js"));
app.use("/extensions", express.static(__dirname + "/extensions"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload({createParentPath: true,}))

server.listen(PORT);

//Socket
socket.on('connection', (socket) => {
  const {id} = socket
  console.log(`Nueva conexión socket: ${id}`);

  socket.on('disconnect', () => {
    console.log(`Desconexión: ${id}`)
  })

  socket.on('error', error => {
    console.log(`Error de: ${id}`)
    console.log(error)
  })
});

//Session cookie
app.use(session({
  secret: process.env.SESSION_SECRET || "575c4bd0-2e5c-4102-a1cf-c49b1ecb6b3b",
  resave: false,
  saveUninitialized: true,
  cookie: {
    id_usuario: 0,
    rol_id: 0,
    login: false,
  },
}));

app.use((request, response, next) => {
  my_session = request.session;
  my_session.login = my_session.cookie.login ? my_session.cookie.login : my_session.login;
  my_session.rol_id = my_session.cookie.rol_id ? my_session.cookie.rol_id : my_session.rol_id;
  my_session.id_usuario = my_session.cookie.id_usuario ? my_session.cookie.id_usuario : my_session.id_usuario;
  next();
});

//Dashboard
app.post("/api/v1/dashboard/consultar_datos_dashboard", async (request, response) => await consultar_datos_dashboard(request, response, socket));

//Escuelas
app.post("/api/v1/escuelas/consultar_escuelas", async (request, response) => await consultar_escuelas(request, response, socket));
app.post("/api/v1/escuelas/consultar_escuela", async (request, response) => await consultar_escuela(request, response, socket));
app.post("/api/v1/escuelas/agregar_escuela", async (request, response) => await agregar_escuela(request, response, socket));
app.post("/api/v1/escuelas/editar_escuela", async (request, response) => await editar_escuela(request, response, socket));
app.post("/api/v1/escuelas/eliminar_escuela", async (request, response) => await eliminar_escuela(request, response, socket));

//Archivos
app.post("/api/v1/escuelas/subir_archivo", async (request, response) => await subir_archivo(request, response, socket));

//Catálogos
app.get("/api/v1/sistemas_educativos/consultar_niveles", async (request, response) => await consultar_niveles(request, response, socket));
app.get("/api/v1/sistemas_educativos/consultar_servicios", async (request, response) => await consultar_servicios(request, response, socket));
app.get("/api/v1/sistemas_educativos/consultar_tipos", async (request, response) => await consultar_tipos(request, response, socket));
app.get("/api/v1/municipios/consultar_municipios", async (request, response) => await consultar_municipios(request, response, socket));
app.get("/api/v1/turnos/consultar_turnos", async (request, response) => await consultar_turnos(request, response, socket));
app.get("/api/v1/modelos/consultar_modelos", async (request, response) => await consultar_modelos(request, response, socket));
app.get("/api/v1/sostenimientos/consultar_sostenimientos", async (request, response) => await consultar_sostenimientos(request, response, socket));
app.get("/api/v1/controles/consultar_controles", async (request, response) => await consultar_controles(request, response, socket));

//Indicadores
app.post("/api/v1/indicadores/consultar_indicadores_internacionales", async (request, response) => await consultar_indicadores_internacionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_nacionales", async (request, response) => await consultar_indicadores_nacionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_institucionales", async (request, response) => await consultar_indicadores_institucionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_estatales", async (request, response) => await consultar_indicadores_estatales(request, response, socket));

//Usuario
app.post("/api/v1/usuarios/validar_usuario", async (request, response) => await validar_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_usuarios", async (request, response) => await consultar_usuarios(request, response, socket));
app.post("/api/v1/usuarios/consultar_usuario", async (request, response) => await consultar_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_rol_usuario", async (request, response) => await consultar_rol_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_roles", async (request, response) => await consultar_roles(request, response, socket));
app.post("/api/v1/usuarios/agregar_usuario", async (request, response) => await agregar_usuario(request, response, socket));
app.post("/api/v1/usuarios/eliminar_usuario", async (request, response) => await eliminar_usuario(request, response, socket));
app.post("/api/v1/usuarios/editar_usuario", async (request, response) => await editar_usuario(request, response, socket));
app.get("/api/v1/usuarios/validar_session", async (request, response) => await validacion_session(request, response));

//Carga de vistas
app.get("/", (request, response) => routes_session(request, response, "/", "dashboard.html", "login.html", false, __dirname));
app.get("/login.html", (request, response) => routes_session(request, response, "/login.html", "dashboard.html", "login.html", false, __dirname));
app.get("/logout.html", (request, response) => routes_session(request, response, "/logout.html", "login.html", "login.html", true, __dirname));
app.get("/dashboard.html", (request, response) => routes_session(request, response, "/dashboard.html", "dashboard.html", "login.html", false, __dirname));
app.get("/escuelas.html", (request, response) => routes_session(request, response, "/escuelas.html", "escuelas.html", "login.html", false, __dirname));
app.get("/indicadores.html", (request, response) => routes_session(request, response, "/indicadores.html", "indicadores.html", "login.html", false, __dirname));
app.get("/usuarios.html", (request, response) => routes_session(request, response, "/usuarios.html", "usuarios.html", "login.html", false, __dirname));

app.use((request, response) => {
  console.log("No encontrado")
  response.sendFile(__dirname + `/public/error-404.html`);
});