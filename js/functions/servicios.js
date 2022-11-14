const {pool} = require("../database/pg");
const web_crypto = require("crypto").webcrypto;

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

const pool_query_insert = (body, uuid, tabla) => {
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
  }

  for (let i = 0; i < llaves_body.length; i++) {
    if (llaves_body[i] !== "token_acceso") {
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

  let query = `UPDATE ${table} SET `;
  let query_where = " Where ";

  for (let i = 0; i < llaves_body.length; i++) query += ` ${llaves_body[i]} = '${values_body[i]}'${i !== llaves_body.length - 1 ? "," : ""} `;

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

module.exports = {
  validar_llaves,
  filtrar_llaves,
  message_failure,
  message_success,
  pool_query,
  pool_query_unique,
  pool_query_insert,
  pool_query_update,
};
