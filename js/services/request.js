const {DOMAIN} = process.env

const request_get = async url => {
  const url_peticion = `${DOMAIN}${url}`;
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
  return responseJSON;
};

const request_post = async (url, json) => {
  const url_peticion = `${DOMAIN}${url}`;
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
  return responseJSON;
};

module.exports = {
  request_get,
  request_post
}