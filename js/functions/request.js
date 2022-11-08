const entorno = null;

async function request_get(url) {
  const url_peticion = `${window.location.origin}${entorno ? `/${entorno}` : ""}${url}`;
  console.log(`request_get(${url_peticion})`);
  const response = await fetch(url_peticion, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  let responseJSON, responseText;
  try {
    responseText = await response.text();
    responseJSON = JSON.parse(responseText);
  } catch (e) {
    console.error(e);
    responseJSON = { success: false, failure: true, mensaje: "UNRESOLVE" };
  }
  return responseJSON;
}

async function request_post(url, json) {
  const url_peticion = `${window.location.origin}${entorno ? `/${entorno}` : ""}${url}`;
  console.log(`request_post(${url_peticion})`, json);
  const response = await fetch(url_peticion, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(json),
  });
  let responseJSON, responseText;
  try {
    responseText = await response.text();
    responseJSON = JSON.parse(responseText);
  } catch (e) {
    console.error(e);
    responseJSON = { success: false, failure: true, mensaje: "UNRESOLVE" };
  }
  return responseJSON;
}
