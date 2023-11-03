/*PUT /api/monumentos/:id: Actualiza la información de un contacto por su id (2 puntos).
En caso de no existir el monumento con id indicado, devolverá un error 404*/

import { Request, Response } from "npm:express@4.18.2";
import { MonumentoModel } from "../db/monumentos.ts";

//PUT
const updateMonumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codPostal, ISO } = req.body;
    if (!nombre || !descripcion || !codPostal || !ISO) {
      res.status(500).send("Nombre, descripción código postal y código ISO son obligatorios"); //por si no están todos los campos
      return;
    }

if(typeof nombre !== "string" || typeof descripcion !== "string" || typeof codPostal !== "string" ||  typeof ISO !== "string"){
  res.status(500).send("Tipo de dato invalido");
  return;
}

    const updatedMonumento = await MonumentoModel.findOneAndUpdate(
      { _id: id },
      { nombre, descripcion, codPostal, ISO },
      { new: true }
    ).exec();

    if (!updatedMonumento) {
      res.status(404).send("Monument not found");
      return;
    }

    res.status(200).send({
        nombre: updatedMonumento.nombre,
        descripcion: updatedMonumento.descripcion,
        codPostal: updatedMonumento.codPostal,
        location: updatedMonumento.ubicacion,
        region: updatedMonumento.continente,
        time: updatedMonumento.hora,
        tiempo: updatedMonumento.tiempoMet,
        id: updatedMonumento._id.toString(), //necesario, porque el id es de tipo object
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonumento;