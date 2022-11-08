const { pool } = require("../database/pg");
const crypto = require("crypto").webcrypto;

const validar_llaves = (llaves_obligatorias, body) => {
  return new Promise((resolve, reject) => {
    const llaves_body = Object.keys(body);

    llaves_obligatorias.forEach((llave_obligatoria) => {
      if (llaves_body.indexOf(llave_obligatoria) === -1) {
        resolve({
          message: `La llave ${llave_obligatoria} es obligatoria`,
          success: false,
        });
      }
      resolve({
        message: ``,
        success: true,
      });
    });
  });
};

const pool_query = (query, msg_success, msg_failure) => {
  console.log(query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      try {
        if (error) {
          console.log("Error query", error);
          resolve(message_failure(msg_failure));
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

const pool_query_insert = (body, uuid) => {
  const llaves_body = Object.keys(body);
  const values_body = Object.values(body);

  let query = "INSERT into escuela ( ";
  let values = "( ";

  if (uuid) {
    query += " uuid, ";
    values += ` '${uuidv4()}', `;
  }

  for (let i = 0; i < llaves_body.length; i++) {
    query += ` ${llaves_body[i]}${i !== llaves_body.length - 1 ? "," : " )"} `;
    values += ` '${values_body[i]}'${i !== llaves_body.length - 1 ? "," : " );"} `;
  }

  query += `Values ${values}`;

  return query;
};

const pool_query_update = (body, where) => {
  const llaves_body = Object.keys(body);
  const values_body = Object.values(body);

  const llaves_where = Object.keys(where);
  const values_where = Object.values(where);

  let query = "UPDATE escuela SET ";
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

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

module.exports = {
  validar_llaves,
  message_failure,
  message_success,
  pool_query,
  pool_query_unique,
  pool_query_insert,
  pool_query_update,
  uuidv4,
};
