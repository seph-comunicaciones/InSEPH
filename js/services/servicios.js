const {pool} = require("../../database/postgres");
const web_crypto = require("crypto").webcrypto;
const {mkdir} = require("fs/promises");

const validar_llaves = (llaves_obligatorias, body) => {
  return new Promise((resolve, reject) => {
    const llaves_body = Object.keys(body);

    for (let i = 0; i < llaves_obligatorias.length; i++) {
      if (llaves_body.indexOf(llaves_obligatorias[i]) < 0) {
        resolve({
          message: `La llave ${llaves_obligatorias[i]} es obligatoria`,
          success: false,
        });
        break;
      }
    }
    resolve({
      message: ``,
      success: true,
    });
  });
};

const filtrar_llaves = (body, llaves_filtrar) => {
  return new Promise((resolve, reject) => {
    const llaves_body = Object.keys(body);
    const values_body = Object.values(body);
    let llaves_filtradas = {}

    llaves_filtrar.forEach((llave) => {
      const indice = llaves_body.indexOf(llave)
      if (indice >= 0) llaves_filtradas[llave] = values_body[indice]
    })
    resolve(llaves_filtradas)
  });
}

const eliminar_llaves = (body, llaves_eliminar) => {
  return new Promise((resolve, reject) => {
    let llaves_filtradas = {...body}

    llaves_eliminar.forEach((llave) => delete llaves_filtradas[llave])

    resolve(llaves_filtradas)
  });
}

const pool_query = (query, msg_success, msg_failure) => {
  console.log(query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      try {
        if (error) {
          resolve(message_failure(msg_failure));
          console.log("Error query", error);
        } else {
          resolve(message_success(msg_success, results.rows));
        }
      } catch (e) {
        console.log("Try", e);
      }
    });
  });
};

const pool_query_unique = (query, msg_success, msg_failure) => {
  console.log(query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      try {
        if (error) {
          console.log("Error query", error);
          resolve(message_failure(msg_failure));
        } else {
          resolve(message_success(msg_success, results.rows[0]));
        }
      } catch (e) {
        console.log("Try", e);
      }
    });
  });
};

const pool_query_insert = (body, uuid, tabla, uuid_val = "") => {
  const llaves_body = Object.keys(body);
  const values_body = Object.values(body);

  llaves_body.push("fecha_modificacion")
  llaves_body.push("hora_modificacion")
  values_body.push(get_fecha())
  values_body.push(get_hora())

  let query = `INSERT into ${tabla} ( `;
  let values = "( ";

  if (uuid) {
    query += " uuid, ";
    values += ` '${get_uuid()}', `;
  } else {
    query += " uuid, ";
    values += ` '${uuid_val}', `;
  }

  for (let i = 0; i < llaves_body.length; i++) {
    if (llaves_body[i] !== "token_acceso" && values_body[i] !== "") {
      query += ` ${llaves_body[i]}${i !== llaves_body.length - 1 ? "," : " )"} `;
      values += llaves_body[i] === "contrasena" ? ` PGP_SYM_ENCRYPT('${values_body[i]}', 'AES_KEY')${i !== llaves_body.length - 1 ? "," : " );"} ` : ` '${values_body[i]}'${i !== llaves_body.length - 1 ? "," : " );"} `;
    }
  }

  query += `Values ${values}`;

  return query;
};

const pool_query_update = (body, where, table) => {
  const llaves_body = Object.keys(body);
  const values_body = Object.values(body);

  const llaves_where = Object.keys(where);
  const values_where = Object.values(where);

  llaves_body.push("fecha_modificacion")
  llaves_body.push("hora_modificacion")
  values_body.push(get_fecha())
  values_body.push(get_hora())

  let query = `UPDATE ${table}
               SET `;
  let query_where = " Where ";

  for (let i = 0; i < llaves_body.length; i++) query += values_body[i] !== "" ? ` ${llaves_body[i]} = '${values_body[i]}'${i !== llaves_body.length - 1 ? "," : ""} ` : ``;

  for (let i = 0; i < llaves_where.length; i++) query_where += ` ${llaves_where[i]} = '${values_where[i]}'${i !== llaves_where.length - 1 ? "," : " ;"} `;

  query += query_where;

  return query;
};

const message_success = (message, result) => {
  return {
    failure: false,
    success: true,
    message: message,
    response: result,
  };
};

const message_failure = (message) => {
  return {
    failure: true,
    success: false,
    message: message,
  };
};

const message_redirect = (url) => {
  return {
    redirect: true,
    url: url,
  };
};

const message_reload = () => {
  return {
    reload: true,
  };
};

const get_uuid = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (web_crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
};

const get_fecha = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const get_hora = () => {
  return new Date().toLocaleTimeString()
}

const name_file = (name) => {
  return new Promise((resolve, reject) => {
    const name_split = name.split(".")
    const type = name_split[name_split.length - 1]
    let new_name

    name_split[name_split.length - 1] = get_uuid()

    new_name = name_split.join("-")
    new_name += `.${type}`

    resolve(new_name)
  });
}

const create_directory = async (path) => {
  try {
    await mkdir(path);
    console.log(`Directorio ${path} creado`);
  } catch (e) {
    if (e.code === "EEXIST") {
      console.log(`Directorio ${path} existente`)
    } else {
      console.log(e);
    }
  }
};

const validate_session = async (request, response, token_acceso) => {
  if (!token_acceso && token_acceso !== "") {
    //Consulta query
    const query_permisos = await pool_query_unique(`SELECT id_usuario, activo, rol_id
                                                    FROM usuario
                                                    WHERE id_usuario = ${request.session.id_usuario ? request.session.id_usuario : 0};`, "", "");

    let id_usuario = -1, activo = false, rol_id = -1

    if (query_permisos.response) {
      id_usuario = query_permisos.response.id_usuario
      activo = query_permisos.response.activo
      rol_id = query_permisos.response.rol_id
    }

    if ((query_permisos.response && !activo) || !query_permisos.response) {
      console.log("Sin permisos")
      request.session.login = false;
      request.session.rol_id = 0;
      request.session.id_usuario = 0;
      return message_redirect("/login.html")
    } else if (query_permisos.response && activo && id_usuario.toString() === request.session.id_usuario.toString() && rol_id.toString() !== request.session.rol_id.toString()) {
      console.log("Actualización de session")
      request.session.login = true;
      request.session.rol_id = rol_id;
      request.session.id_usuario = id_usuario;
      return message_reload()
    }
  }

  return {}
}

const routes_session = (request, response, route, session_true, session_false, log_out, dir_name) => {
  console.log("Accediendo a la ruta", route)

  if (log_out) {
    request.session.login = false;
    request.session.rol_id = 0;
    request.session.id_usuario = 0;
  }

  console.log(request.session);

  if (!request.session.login) {
    response.sendFile(dir_name + `/public/${session_false}`);
  }

  if (request.session.rol_id && request.session.rol_id !== 1) {
    if (request.session.login) {
      switch (route) {
        case "/dashboard.html":
          response.sendFile(dir_name + `/public/dashboard_us.html`);
          break
        case "/escuelas.html":
          response.sendFile(dir_name + `/public/escuelas_us.html`);
          break
        case "/usuarios.html":
          response.sendFile(dir_name + `/public/dashboard_us.html`);
          break
        case "/indicadores.html":
          response.sendFile(dir_name + `/public/indicadores_us.html`);
          break
        case "/avisos.html":
          response.sendFile(dir_name + `/public/avisos_us.html`);
          break
        case "/logout.html":
          response.sendFile(dir_name + `/public/login.html`);
          break
        default:
          response.sendFile(dir_name + `/public/dashboard_us.html`);
      }
    }
  } else {
    if (request.session.login) {
      response.sendFile(dir_name + `/public/${session_true}`);
    }
  }
};

module.exports = {
  validar_llaves,
  filtrar_llaves,
  eliminar_llaves,
  message_failure,
  message_success,
  message_redirect,
  message_reload,
  pool_query,
  pool_query_unique,
  pool_query_insert,
  pool_query_update,
  name_file,
  create_directory,
  validate_session,
  routes_session,
  get_uuid
};
