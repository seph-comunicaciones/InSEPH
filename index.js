const express = require("express");
const { consultar_escuelas } = require("./js/services/escuelas");

const server = express();

server.get("/api/v1/escuelas/consultar_escuelas", consultar_escuelas);

server.use("/js", express.static(__dirname + "/js"));
server.use("/extensions", express.static(__dirname + "/extensions"));
server.use("/fonts", express.static(__dirname + "/fonts"));
server.use("/images", express.static(__dirname + "/images"));
server.use("/css", express.static(__dirname + "/css"));
server.use(express.static(__dirname + "/public"));

server.listen(process.env.PORT || 3000);
