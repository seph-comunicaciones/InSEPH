const express = require("express");
const bodyParser = require("body-parser");
const {
  consultar_escuelas,
  agregar_escuela,
  consultar_escuela,
} = require("./js/services/escuelas");
const { consultar_municipios } = require("./js/services/municipios");
const { consultar_turnos } = require("./js/services/turnos");
const { consultar_modelos } = require("./js/services/modelos");

const app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/extensions", express.static(__dirname + "/extensions"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/css", express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

//Escuelas
app.post("/api/v1/escuelas/consultar_escuelas", consultar_escuelas);
app.post("/api/v1/escuelas/consultar_escuela", consultar_escuela);
app.post("/api/v1/escuelas/agregar_escuela", agregar_escuela);

//Municipios
app.get("/api/v1/municipios/consultar_municipios", consultar_municipios);

//Turnos
app.get("/api/v1/turnos/consultar_turnos", consultar_turnos);

//Turnos
app.get("/api/v1/modelos/consultar_modelos", consultar_modelos);
