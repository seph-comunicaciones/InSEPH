const entorno = null;

const request_get = async url => {
  const url_peticion = `${window.location.origin}${entorno ? `/${entorno}` : ""}${url}`;
  console.log(`request_get(${url_peticion})`);
  const response = await fetch(url_peticion, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  let responseJSON;
  try {
    responseJSON = JSON.parse(await response.text());
  } catch (e) {
    console.error(e);
    responseJSON = {success: false, failure: true, message: "UNRESOLVE"};
  }
  if (responseJSON.redirect) {
    location.href = `${window.location.origin}${entorno ? `/${entorno}` : ""}${responseJSON.url}`;
  }
  if (responseJSON.reload) {
    location.reload();
  }
  return responseJSON;
};

const request_post = async (url, json) => {
  const url_peticion = `${window.location.origin}${entorno ? `/${entorno}` : ""}${url}`;
  console.log(`request_post(${url_peticion})`, json);
  const response = await fetch(url_peticion, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"},
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(json),
  });
  let responseJSON;
  try {
    responseJSON = JSON.parse(await response.text());
  } catch (e) {
    console.error(e);
    responseJSON = {success: false, failure: true, message: "UNRESOLVE"};
  }
  if (responseJSON.redirect) {
    location.href = `${window.location.origin}${entorno ? `/${entorno}` : ""}${responseJSON.url}`;
  }
  if (responseJSON.reload) {
    location.reload();
  }
  return responseJSON;
};

const subir_archivo = async (file) => {
  const url = "/api/v1/escuelas/subir_archivo"
  const url_peticion = `${window.location.origin}${entorno ? `/${entorno}` : ""}${url}`;
  console.log("Subiendo archivo")
  const response = await fetch(url_peticion, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: file,
  });
  let responseJSON;
  try {
    responseJSON = JSON.parse(await response.text());
  } catch (e) {
    console.error(e);
    responseJSON = {success: false, failure: true, message: "UNRESOLVE"};
  }
  return responseJSON;
};
