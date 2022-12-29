const initial_message = require("./initial.json")
const response_message = require("./response.json")
const fs = require("fs");
const step_message = require("./step.json");
const {request_post} = require("../services/request");

const get_step = (message) => {
  return new Promise((resolve, reject) => {
    const {key} = initial_message.find(k => k.keywords.includes(message)) || {key: null}
    const response = key || null
    resolve(response)
  });
}


const get_last_step = (from) => {
  return new Promise((resolve, reject) => {
    fs.exists(`./js/chat_bot/chats/${from}.json`, (exists) => {
      if (exists) {
        fs.readFile(`./js/chat_bot/chats/${from}.json`, (err, data) => {
          const message = JSON.parse(data)
          const {messages} = message
          const messages_reverse = [...messages].reverse()

          const step_message_reverse = [...step_message].reverse()

          for (let i = 0; i < step_message_reverse.length; i++) {
            const step = step_message_reverse[i];
            const message = messages_reverse.find(({message}) => message === step.keyword)

            if (message) {
              resolve(step.key || null)
              return null
            }
          }

          resolve(null)
          return null
        })
      } else {
        resolve(null)
      }
    })
  });
}

const reply = (step, from, split = false) => {
  return new Promise((resolve, reject) => {
    let response = {replyMessage: '', media: null, trigger: null}

    if (split) {
      const step_split = step.split("_")
      step = `STEP_${parseInt(step_split[1]) + 1}`
    }

    if (step === "STEP_9") {
      fs.readFile(`./js/chat_bot/chats/${from}.json`, (err, data) => {
        const message = {...JSON.parse(data)}
        const message_reverse = [...message.messages].reverse()

        const datos_nuevo_usuario = ["rol_id", "contrasena", "usuario", "correo", "telefono", "apellido_materno", "apellido_paterno", "nombre"]
        let json = {}
        let j = 0
        for (let i = 0; i < message_reverse.length; i++) if (i % 2 === 0) json[datos_nuevo_usuario[j++]] = message_reverse[i].message
        json.token_acceso = "0012b5cc-0f3e-4c66-8fd3-24b828e359a2"
        json.usuario_id_modificacion = 2

        request_post("/api/v1/usuarios/agregar_usuario", json).then((response) => {
          resolve({
            replyMessage: response.message,
            media: null,
            trigger: null
          })

          fs.writeFile(`./js/chat_bot/chats/${from}.json`,
            JSON.stringify({messages: []}),
            (error) => {
              resolve(true)
              if (error) console.log(error);
            }
          );

          return null
        })
      })
    }else {

      const responseFind = response_message[step] || {};

      response = {
        ...response,
        ...responseFind,
        replyMessage: responseFind.replyMessage.join('')
      }
      resolve(response);
    }
  });
}

const create_chat = (from, message) => {
  return new Promise((resolve, reject) => {
    const new_message = {
      messages: [
        {
          "message": message,
          "date": new Date().toLocaleString()
        }
      ]
    };

    fs.exists(`./js/chat_bot/chats/${from}.json`, (exists) => {
      if (exists) {
        fs.readFile(`./js/chat_bot/chats/${from}.json`, (err, data) => {
          const message = JSON.parse(data)
          message.messages.push(new_message.messages[0])

          fs.writeFile(`./js/chat_bot/chats/${from}.json`,
            JSON.stringify(message),
            (error) => {
              resolve(true)
              if (error) console.log(error);
            }
          );
        })
      } else {
        fs.writeFile(`./js/chat_bot/chats/${from}.json`,
          JSON.stringify(new_message),
          (error) => {
            resolve(true)
            if (error) console.log(error);
          }
        );
      }
    })
  })
}

module.exports = {
  get_step,
  get_last_step,
  reply,
  create_chat
}