/*GET /api/monumentos: Obtiene una lista de todos los monumentos, indicando (solo) id, nombre y país (1.5 puntos).*/

import { Request, Response } from "npm:express@4.18.2";
import { MonumentoModel } from "../db/monumentos.ts";

//Get all
const getMonumentos = async (req: Request, res: Response) => {
  try {
    const monumentos = await MonumentoModel.find().exec();
    if (!monumentos) {
      res.status(404).send("Monument not found");
      return;
    }
        const monumentosList = monumentos.map((monumento) => ({
      nombre: monumento.nombre,
      pais: monumento.continente,
      id: monumento._id.toString(),
        }))
        res.status(200).json(monumentosList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumentos;