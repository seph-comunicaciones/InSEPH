const {message_failure, name_file, message_success} = require("../functions/servicios");

const {DOMAIN, PATH_FILES_ESCUELA} = process.env

const subir_archivo = async (request, response) => {
  if (!request.files) return response.status(400).json(message_failure("Error, no hay archivo que subir"));

  const archivo = request.files.archivo;
  const file = await name_file(archivo.name);

  try {
    await archivo.mv(`${__dirname}../../../${PATH_FILES_ESCUELA}/${file}`, (error) => {
      if (error) {
        console.log(error);
        return response.status(400).json(message_failure("Error, no se pudo subir el archivo"));
      }
      console.log(`Imagen agregada. Path: ${DOMAIN}/${PATH_FILES_ESCUELA}/${file}`)
      return response.status(200).json(message_success("Imagen agregada exitosamente", {"path": `${DOMAIN}/${PATH_FILES_ESCUELA}/${file}`}));
    });
  } catch (e) {
    console.log(e);
    return response.status(400).json(message_failure("Error, no se pudo subir el archivo"));
  }
}

module.exports = {
  subir_archivo
}