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

const qrcode = require("qrcode-terminal");
const {Client, LocalAuth} = require("whatsapp-web.js");
const {reply, get_step, get_last_step, create_chat} = require("./js/chat_bot/message")

const {routes_session} = require("./js/services/servicios");
const {consultar_datos_dashboard} = require("./js/services/dashboard");
const {consultar_escuelas, consultar_escuela, eliminar_escuela, editar_escuela, agregar_escuela} = require("./js/services/escuela");
const {subir_archivo} = require("./js/services/archivo")
const {editar_usuario, validar_usuario, consultar_usuarios, consultar_usuario, consultar_rol_usuario, consultar_roles, agregar_usuario, eliminar_usuario, validacion_session} = require("./js/services/usuario");
const {consultar_marcas, consultar_estatus, consultar_turnos_1, consultar_turnos_2, consultar_turnos_3, consultar_niveles, consultar_tipos, consultar_inmuebles, consultar_directores, consultar_region, consultar_sostenimiento_control, consultar_sostenimiento_sub_control, consultar_sostenimiento_dependencia_1, consultar_sostenimiento_dependencia_2, consultar_sostenimiento_dependencia_3, consultar_sostenimiento_dependencia_4, consultar_sostenimiento_servicio, consultar_dependencia_operativa_1, consultar_dependencia_operativa_2, consultar_dependencia_operativa_3, consultar_dependencia_operativa_4, consultar_dependencia_operativa_5, consultar_servicio_educativo, consultar_servicio_cam, consultar_caracteristica_1, consultar_caracteristica_2, consultar_municipios, consultar_postal} = require("./js/services/catalogo");
const {consultar_indicadores_internacionales, consultar_indicadores_nacionales, consultar_indicadores_institucionales, consultar_indicadores_estatales} = require("./js/services/indicadores");
const {consultar_avisos, consultar_aviso} = require("./js/services/aviso");
const fs = require("fs");

const {PORT, DEFAULT_MESSAGE} = process.env
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
console.log(`"Server on port ${PORT}"`)

//Bot WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true});
});

client.on("authenticated", () => {
  console.log("Autentificado");
});

client.on("ready", () => {
  console.log("Cliente listo");
});

client.on("message", async (msg) => {
  const {from, body} = msg;
  const message = body.toLowerCase();

  if (message !== "cancelar") {
    const last_step = await get_last_step(from)
    const step = last_step ? await last_step : await get_step(message);
    await create_chat(from, body)

    if (step) {
      const data = await reply(step, from, true)
      await create_chat(from, data.replyMessage)
      await client.sendMessage(from, data.replyMessage);
    }

    if (DEFAULT_MESSAGE === 'true' && !step) {
      const response = await reply('DEFAULT', from)
      await create_chat(from, response.replyMessage)
      await client.sendMessage(from, response.replyMessage);
    }
  } else {
    await client.sendMessage(from, "Registro de usuario cancelado");

    fs.writeFile(`./js/chat_bot/chats/${from}.json`,
      JSON.stringify({messages: []}),
      (error) => {
        if (error) console.log(error);
      }
    );
  }
});

client.initialize();

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
app.get("/api/v1/catalogos/consultar_municipios", async (request, response) => await consultar_municipios(request, response, socket));
app.get("/api/v1/catalogos/consultar_marcas", async (request, response) => await consultar_marcas(request, response, socket));
app.get("/api/v1/catalogos/consultar_estatus", async (request, response) => await consultar_estatus(request, response, socket));
app.get("/api/v1/catalogos/consultar_turnos_1", async (request, response) => await consultar_turnos_1(request, response, socket));
app.get("/api/v1/catalogos/consultar_turnos_2", async (request, response) => await consultar_turnos_2(request, response, socket));
app.get("/api/v1/catalogos/consultar_turnos_3", async (request, response) => await consultar_turnos_3(request, response, socket));
app.get("/api/v1/catalogos/consultar_niveles", async (request, response) => await consultar_niveles(request, response, socket));
app.get("/api/v1/catalogos/consultar_tipos", async (request, response) => await consultar_tipos(request, response, socket));
app.get("/api/v1/catalogos/consultar_directores", async (request, response) => await consultar_directores(request, response, socket));
app.get("/api/v1/catalogos/consultar_inmuebles", async (request, response) => await consultar_inmuebles(request, response, socket));
app.get("/api/v1/catalogos/consultar_postal", async (request, response) => await consultar_postal(request, response, socket));
app.get("/api/v1/catalogos/consultar_region", async (request, response) => await consultar_region(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_control", async (request, response) => await consultar_sostenimiento_control(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_sub_control", async (request, response) => await consultar_sostenimiento_sub_control(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_dependencia_1", async (request, response) => await consultar_sostenimiento_dependencia_1(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_dependencia_2", async (request, response) => await consultar_sostenimiento_dependencia_2(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_dependencia_3", async (request, response) => await consultar_sostenimiento_dependencia_3(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_dependencia_4", async (request, response) => await consultar_sostenimiento_dependencia_4(request, response, socket));
app.get("/api/v1/catalogos/consultar_sostenimiento_servicio", async (request, response) => await consultar_sostenimiento_servicio(request, response, socket));
app.get("/api/v1/catalogos/consultar_dependencia_operativa_1", async (request, response) => await consultar_dependencia_operativa_1(request, response, socket));
app.get("/api/v1/catalogos/consultar_dependencia_operativa_2", async (request, response) => await consultar_dependencia_operativa_2(request, response, socket));
app.get("/api/v1/catalogos/consultar_dependencia_operativa_3", async (request, response) => await consultar_dependencia_operativa_3(request, response, socket));
app.get("/api/v1/catalogos/consultar_dependencia_operativa_4", async (request, response) => await consultar_dependencia_operativa_4(request, response, socket));
app.get("/api/v1/catalogos/consultar_dependencia_operativa_5", async (request, response) => await consultar_dependencia_operativa_5(request, response, socket));
app.get("/api/v1/catalogos/consultar_servicio_educativo", async (request, response) => await consultar_servicio_educativo(request, response, socket));
app.get("/api/v1/catalogos/consultar_servicio_cam", async (request, response) => await consultar_servicio_cam(request, response, socket));
app.get("/api/v1/catalogos/consultar_caracteristica_1", async (request, response) => await consultar_caracteristica_1(request, response, socket));
app.get("/api/v1/catalogos/consultar_caracteristica_2", async (request, response) => await consultar_caracteristica_2(request, response, socket));

//Indicadores
app.post("/api/v1/indicadores/consultar_indicadores_internacionales", async (request, response) => await consultar_indicadores_internacionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_nacionales", async (request, response) => await consultar_indicadores_nacionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_institucionales", async (request, response) => await consultar_indicadores_institucionales(request, response, socket));
app.post("/api/v1/indicadores/consultar_indicadores_estatales", async (request, response) => await consultar_indicadores_estatales(request, response, socket));

//Avisos
app.post("/api/v1/avisos/consultar_avisos", async (request, response) => await consultar_avisos(request, response, socket));
app.post("/api/v1/avisos/consultar_aviso", async (request, response) => await consultar_aviso(request, response, socket));

//Usuario
app.post("/api/v1/usuarios/validar_usuario", async (request, response) => await validar_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_usuarios", async (request, response) => await consultar_usuarios(request, response, socket));
app.post("/api/v1/usuarios/consultar_usuario", async (request, response) => await consultar_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_rol_usuario", async (request, response) => await consultar_rol_usuario(request, response, socket));
app.post("/api/v1/usuarios/consultar_roles", async (request, response) => await consultar_roles(request, response, socket));
app.post("/api/v1/usuarios/agregar_usuario", async (request, response) => await agregar_usuario(request, response, socket));
app.post("/api/v1/usuarios/eliminar_usuario", async (request, response) => await eliminar_usuario(request, response, socket));
app.post("/api/v1/usuarios/editar_usuario", async (request, response) => await editar_usuario(request, response, socket));
app.get("/api/v1/usuarios/validar_session", async (request, response) => await validacion_session(request, response, socket));

//Carga de vistas
app.get("/", (request, response) => routes_session(request, response, "/", "dashboard.html", "login.html", false, __dirname));
app.get("/login.html", (request, response) => routes_session(request, response, "/login.html", "dashboard.html", "login.html", false, __dirname));
app.get("/logout.html", (request, response) => routes_session(request, response, "/logout.html", "login.html", "login.html", true, __dirname));
app.get("/dashboard.html", (request, response) => routes_session(request, response, "/dashboard.html", "dashboard.html", "login.html", false, __dirname));
app.get("/escuelas.html", (request, response) => routes_session(request, response, "/escuelas.html", "escuelas.html", "login.html", false, __dirname));
app.get("/indicadores.html", (request, response) => routes_session(request, response, "/indicadores.html", "indicadores.html", "login.html", false, __dirname));
app.get("/avisos.html", (request, response) => routes_session(request, response, "/avisos.html", "avisos.html", "login.html", false, __dirname));
app.get("/usuarios.html", (request, response) => routes_session(request, response, "/usuarios.html", "usuarios.html", "login.html", false, __dirname));

app.use((request, response) => {
  console.log("No encontrado")
  response.sendFile(__dirname + `/public/error-404.html`);
});