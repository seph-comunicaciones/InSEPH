const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const socket = new Server(server);
let my_session;

const {validar_llaves, message_failure, pool_query_unique, pool_query, pool_query_insert, pool_query_update, filtrar_llaves, message_success} = require("./js/functions/servicios");

app.use("/js", express.static(__dirname + "/js"));
app.use("/extensions", express.static(__dirname + "/extensions"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/css", express.static(__dirname + "/css"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

server.listen(process.env.PORT || 3000);

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
    maxAge: 30 * 24 * 60 * 60 * 1000,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
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

//Escuelas
app.post("/api/v1/escuelas/consultar_escuelas", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_municipio"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) {
    return response.status(400).json(message_failure(validacion_llaves.message));
  }

  //Consulta query
  const {id_municipio} = request.body;

  const query = await pool_query(
    `Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
    From escuela
    Join turno On escuela.turno_id = turno.id_turno
    Join municipio On escuela.municipio_id = municipio.id_municipio ${id_municipio !== "" ? ` Where municipio.id_municipio = ${id_municipio} And escuela.activo = true ` : " Where escuela.activo = true "};`,
    "Escuelas consultadas exitosamente",
    "Error, no se pudieron consultar las escuelas"
  );

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});
app.post("/api/v1/escuelas/consultar_escuela", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela} = request.body;

  const query = await pool_query_unique(
    `Select escuela.*,
                   LEFT(cast(escuela.fecha_modificacion AS varchar),10) AS fecha_modificacion,
                   turno.nom_turno,
                   control.nom_control,
                   modelo.nom_modelo,
                   sostenimiento.nom_sostenimiento,
                   municipio.nom_municipio,
                   nivel.nom_nivel,
                   tipo.nom_tipo,
                   servicio_educativo.nom_servicio_educativo,
                   usuario.nombre           AS usuario_nombre_modificacion,
                   usuario.apellido_paterno AS usuario_apellido_paterno_modificacion,
                   usuario.apellido_materno AS usuario_apellido_materno_modificacion
            From escuela
                     Join turno On escuela.turno_id = turno.id_turno
                     Join control On escuela.control_id = control.id_control
                     Join modelo On escuela.modelo_id = modelo.id_modelo
                     Join sostenimiento On escuela.sostenimiento_id = sostenimiento.id_sostenimiento
                     Join municipio On escuela.municipio_id = municipio.id_municipio
                     Join nivel On escuela.nivel_id = nivel.id_nivel
                     Join tipo On escuela.tipo_id = tipo.id_tipo
                     Join servicio_educativo On escuela.servicio_educativo_id = servicio_educativo.id_servicio_educativo
                     JOIN usuario on escuela.usuario_id_modificacion = usuario.id_usuario
            Where escuela.id_escuela = '${id_escuela}'
              AND escuela.activo = true;`,
    "Escuela consultada exitosamente",
    "Error, no se pudo consultar la escuela"
  );

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});
app.post("/api/v1/escuelas/agregar_escuela", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["clave", "nombre", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "sostenimiento_id", "municipio_id", "nivel_id", "tipo_id", "servicio_educativo_id"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, clave} = request.body;

  if ((request.session.rol_id === 1 || request.session.rol_id === 2) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    //Validar que no exista esta clave
    const validacion = await pool_query_unique(`SELECT clave FROM escuela where clave = '${clave}';`, "", "Error, no se pudo agregar la escuela")

    if (validacion.response && validacion.success) {
      if (validacion.response.clave === clave.toString()) {
        return response.status(200).json(message_failure("Clave no disponible"))
      }
    }

    const query = await pool_query(pool_query_insert(request.body, true, "escuela"), "Escuela registrada exitosamente", "Error, no se pudo registrar la escuela");

    if (query.success) {
      const query_socket = await pool_query_unique(`Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
        From escuela
        Join turno On escuela.turno_id = turno.id_turno
        Join municipio On escuela.municipio_id = municipio.id_municipio  Where escuela.clave = '${clave}' And escuela.activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("agregar_escuela", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/escuelas/editar_escuela", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela, token_acceso} = request.body;
  if ((request.session.rol_id === 1) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    const where = {id_escuela: id_escuela};
    const llaves_filtrar = ["id_escuela", "nombre", "pag_web", "telefono", "alum_muj", "alum_hom", "doc_muj", "doc_hom", "aulas_exist", "aulas_uso", "turno_id", "control_id", "modelo_id", "tipo_id", "servicio_educativo_id", "sostenimiento_id", "municipio_id", "nivel_id", "usuario_id_modificacion"]
    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, llaves_filtrar), where, "escuela"), "Escuela editada exitosamente", "Error, no se pudo editar la escuela");

    if (query.success) {
      const query_socket = await pool_query_unique(`Select escuela.id_escuela, escuela.clave, escuela.nombre, turno.nom_turno, municipio.nom_municipio
        From escuela
        Join turno On escuela.turno_id = turno.id_turno
        Join municipio On escuela.municipio_id = municipio.id_municipio  Where escuela.id_escuela = ${id_escuela} And escuela.activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("editar_escuela", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/escuelas/eliminar_escuela", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_escuela"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {id_escuela, token_acceso} = request.body;
  if ((request.session.rol_id === 1) || (token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2")) {
    request.body["activo"] = false
    const query = await pool_query(pool_query_update(request.body, {id_escuela: id_escuela}, "escuela"), "Escuela eliminada exitosamente", "Error, no se pudo eliminar la escuela");

    if (query.success) {
      const query_socket = await pool_query_unique(`Select clave From escuela Where id_escuela = ${id_escuela};`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("eliminar_escuela", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});

//Dashboard
app.post("/api/v1/dashboard/consultar_datos_dashboard", async (request, response) => {
  //Consulta query
  const {municipio_id} = request.body
  const datos_niveles = {}

  const query_datos_alumnos_docentes_aulas = await pool_query_unique(`SELECT SUM(alum_hom)            as alum_hom,
                                                       SUM(alum_muj)            as alum_muj,
                                                       SUM(alum_hom + alum_muj) as alum_tot,
                                                       SUM(doc_hom)             as doc_hom,
                                                       SUM(doc_muj)             as doc_muj,
                                                       SUM(doc_hom + doc_muj)   as doc_tot,
                                                       SUM(aulas_exist)         as aulas_exist,
                                                       SUM(aulas_uso)           as aulas_uso
                                                FROM escuela
                                                WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} activo = true;`, "", "");

  const query_niveles = await pool_query(`SELECT tipo_id FROM escuela WHERE ${municipio_id!==""?` municipio_id = ${municipio_id} AND `:``} activo = true;`, ``, ``)

  const niveles = [{"name": "preescolar", "id": 1}, {"name": "primaria", "id": 2}, {"name": "secundaria", "id": 3}, {"name": "bachiller", "id": 4}, {"name": "licenciatura", "id": 5}, {"name": "posgrado", "id": 6}]
  niveles.forEach((nivel) => datos_niveles[nivel.name] = (query_niveles.response.filter(({tipo_id}) => tipo_id === nivel.id).length))

  if (query_datos_alumnos_docentes_aulas.success && query_niveles.success) {
    const query = {
      "datos_alumnos_docentes_aulas": query_datos_alumnos_docentes_aulas.response,
      "datos_niveles": datos_niveles,
    }
    return response.status(200).json(message_success("Datos consultados exitosamente", query));
  } else {
    return response.status(400).json(message_failure("No se pudieron consultar los datos"));
  }
});

//Sistemas educativos
app.get("/api/v1/sistemas_educativos/consultar_niveles", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From nivel;", "Niveles educativos consultados exitosamente", "Error, no se pudieron consultar los niveles educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});
app.get("/api/v1/sistemas_educativos/consultar_servicios", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From servicio_educativo;", "Servicios educativos consultados exitosamente", "Error, no se pudieron consultar los servicios educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});
app.get("/api/v1/sistemas_educativos/consultar_tipos", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From tipo;", "Tipos educativos consultados exitosamente", "Error, no se pudieron consultar los tipos educativos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Municipios
app.get("/api/v1/municipios/consultar_municipios", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From municipio;", "Municipios consultados exitosamente", "Error, no se pudieron consultar los municipios");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Turnos
app.get("/api/v1/turnos/consultar_turnos", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From turno;", "Turnos consultados exitosamente", "Error, no se pudieron consultar los turnos");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Modelos educativos
app.get("/api/v1/modelos/consultar_modelos", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From modelo;", "Modelos de educación consultados exitosamente", "Error, no se pudieron consultar los modelos de educación");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Sostenimientos educativos
app.get("/api/v1/sostenimientos/consultar_sostenimientos", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sostenimiento;", "Sostenimientos educativos consultados exitosamente", "Error, no se pudieron consultar los sostenimientos educativo");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Controles
app.get("/api/v1/controles/consultar_controles", async (request, response) => {
  //Consulta query
  const query = await pool_query("Select * From sost_control;", "Controles consultados exitosamente", "Error, no se pudieron consultar los controles");

  if (query.success) {
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});

//Usuario
app.post("/api/v1/usuarios/validar_usuario", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "contrasena"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {usuario, contrasena} = request.body;

  const query = await pool_query_unique(`Select * From usuario Where usuario = '${usuario}' AND PGP_SYM_DECRYPT(contrasena::bytea, 'AES_KEY') = '${contrasena}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo validar el usuario");

  if (!query.response) {
    return response.status(200).json(message_failure("Usuario o contraseña no encontrados"));
  } else if (query.success) {
    request.session.login = true;
    request.session.id_usuario = query.response.id_usuario;
    request.session.rol_id = query.response.rol_id;
    return response.status(200).json(query);
  } else {
    return response.status(400).json(query);
  }
});
app.post("/api/v1/usuarios/consultar_usuarios", async (request, response) => {
  //Consulta query
  const {token_acceso} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query(`SELECT usuario,  nombre, apellido_materno, apellido_paterno, id_usuario FROM usuario WHERE activo = true;`, "Usuarios consultados exitosamente", "Error, no se pudieron consultar los usuarios");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/consultar_usuario", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query_unique(`SELECT usuario, correo, nombre, apellido_materno, apellido_paterno, telefono, rol_id, id_usuario, usuario_id_modificacion, hora_modificacion, LEFT(cast(fecha_modificacion AS varchar),10) AS fecha_modificacion FROM usuario WHERE id_usuario = '${id_usuario}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");

    if (query.success) {
      const query_us_mod = await pool_query_unique(`SELECT nombre, apellido_materno, apellido_paterno FROM usuario WHERE id_usuario = '${query.response.usuario_id_modificacion}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");

      if (query_us_mod.success) {
        query.response["usuario_nombre_modificacion"] = query_us_mod.response.nombre
        query.response["usuario_apellido_paterno_modificacion"] = query_us_mod.response.apellido_paterno
        query.response["usuario_apellido_materno_modificacion"] = query_us_mod.response.apellido_materno
        return response.status(200).json(query);
      } else {
        return response.status(400).json(query);
      }
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/consultar_rol_usuario", async (request, response) => {
  //Consulta query
  const {id_usuario} = request.body;

  if (request.session.login || id_usuario) {
    const query = await pool_query_unique(`SELECT rol_id FROM usuario WHERE id_usuario = '${request.session.login? request.session.id_usuario: id_usuario}' And activo = true;`, "Rol consultado exitosamente", "Error, no se pudo consultar el rol");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/consultar_roles", async (request, response) => {
  //Consulta query
  const {token_acceso} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    const query = await pool_query(`SELECT * FROM rol;`, "Roles consultados exitosamente", "Error, no se pudieron consultar los roles");

    if (query.success) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/agregar_usuario", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["usuario", "correo", "contrasena", "nombre", "apellido_paterno", "apellido_materno", "rol_id"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, usuario, correo} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT usuario, correo FROM usuario WHERE usuario = '${usuario}' OR correo = '${correo}';`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.usuario === usuario) return response.status(200).json(message_failure("Usuario no disponible"))
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no disponible"));
    }

    const query = await pool_query(pool_query_insert(request.body, true, "usuario"), "Usuario agregado exitosamente", "Error, no se pudo agregar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, nombre, apellido_materno, apellido_paterno, id_usuario FROM usuario WHERE usuario = '${usuario}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("agregar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/eliminar_usuario", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));
  //Consulta query
  const {token_acceso, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    request.body["activo"] = false
    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, ["activo", "usuario_id_modificacion"]), {id_usuario: id_usuario}, "usuario"), "Usuario eliminado exitosamente", "Error, no se pudo eliminar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, id_usuario FROM usuario WHERE id_usuario = '${id_usuario}';`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("eliminar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});
app.post("/api/v1/usuarios/editar_usuario", async (request, response) => {
  //Validar llaves obligatorias
  const llaves_obligatorias = ["id_usuario"];

  if (!request.session.id_usuario || request.session.id_usuario === 0) {
    llaves_obligatorias.push("usuario_id_modificacion")
  } else {
    request.body["usuario_id_modificacion"] = request.session.id_usuario
  }

  const validacion_llaves = await validar_llaves(llaves_obligatorias, request.body);

  if (!validacion_llaves.success) return response.status(400).json(message_failure(validacion_llaves.message));

  //Consulta query
  const {token_acceso, correo, id_usuario} = request.body;

  if (request.session.rol_id === 1 || token_acceso === "0012b5cc-0f3e-4c66-8fd3-24b828e359a2") {
    //Comparar el usuario y correo del nuevo usuario
    const validacion = await pool_query_unique(`SELECT correo FROM usuario WHERE  correo = '${correo}' AND id_usuario != ${id_usuario} AND activo = true;`, "", "Error, no se pudo agregar el usuario")

    if (validacion.response && validacion.success) {
      if (validacion.response.correo === correo) return response.status(200).json(message_failure("Correo no valido"));
    }

    const query = await pool_query(pool_query_update(await filtrar_llaves(request.body, ["correo", "telefono", "rol_id", "usuario_id_modificacion"]), {id_usuario: id_usuario}, "usuario"), "Usuario actualizado exitosamente", "Error, no se pudo editar el usuario");

    if (query.success) {
      const query_socket = await pool_query_unique(`SELECT usuario, nombre, apellido_materno, apellido_paterno, id_usuario FROM usuario WHERE id_usuario = '${id_usuario}' And activo = true;`, "Usuario consultado exitosamente", "Error, no se pudo consultar el usuario");
      socket.emit("editar_usuario", query_socket.response)
      return response.status(200).json(query);
    } else {
      return response.status(400).json(query);
    }
  } else {
    return response.status(200).json(message_failure("No tienes los permisos para esta acción"));
  }
});

//Carga de vistas
const routes_session = (route, session_true, session_false, log_out) => (request, response) => {
  console.log("Accediendo a la ruta", route)

  if (log_out) {
    request.session.login = false;
    request.session.rol_id = 0;
    request.session.id_usuario = 0;
  }

  console.log(request.session);

  if (request.session.rol_id && request.session.rol_id !== 1) {
    if (request.session.login) {
      switch (route) {
        case "/dashboard.html":
          response.sendFile(__dirname + `/public/dashboard_us.html`);
          break
        case "/escuelas.html":
          response.sendFile(__dirname + `/public/escuelas_us.html`);
          break
        case "/usuarios.html":
          response.sendFile(__dirname + `/public/dashboard_us.html`);
          break
        case "/logout.html":
          response.sendFile(__dirname + `/public/login.html`);
          break
        default:
          response.sendFile(__dirname + `/public/dashboard_us.html`);
      }
    } else {
      response.sendFile(__dirname + `/public/${session_false}`);
    }

  } else {
    if (request.session.login) {
      response.sendFile(__dirname + `/public/${session_true}`);
    } else {
      response.sendFile(__dirname + `/public/${session_false}`);
    }
  }
};

app.get("/", routes_session("/", "dashboard.html", "login.html", false));
app.get("/login.html", routes_session("/login.html", "dashboard.html", "login.html", false));
app.get("/logout.html", routes_session("/logout.html", "login.html", "login.html", true));
app.get("/dashboard.html", routes_session("/dashboard.html", "dashboard.html", "login.html", false));
app.get("/escuelas.html", routes_session("/escuelas.html", "escuelas.html", "login.html", false));
app.get("/usuarios.html", routes_session("/usuarios.html", "usuarios.html", "login.html", false));

app.use((request, response) => {
  response.status(404);
  console.log("Not found")
  response.sendFile(__dirname + `/public/error-404.html`);
});