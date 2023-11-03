/*GET /api/monumentos/:id: Obtiene información detallada (id, nombre, descripción, páis, ciudad, etc. ) de un monumento según su id - la climatología y la hora deben ser las del momento de realizar la consulta - (3.5 puntos).
En caso de no existir el monumento con id indicado, devolverá un error 404*/

import { Request, Response } from "npm:express@4.18.2";
import { MonumentoModel } from "../db/monumentos.ts";
//Get ID
const getMonumentoID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("ID recibido:", id);
    const monumento = await MonumentoModel.findOne({  _id: id }).exec();
    if (!monumento) {
      res.status(404).send("Monument not found");
      return;
    }
    res.status(200).send({
        nombre: monumento.nombre,
        descripcion: monumento.descripcion,
        codPostal: monumento.codPostal,
        location: monumento.ubicacion,
        region: monumento.continente,
        //datetime: monumento.hora,
        tiempo: monumento.tiempoMet,
        id: monumento._id.toString(), //necesario, porque el id es de tipo object
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumentoID;