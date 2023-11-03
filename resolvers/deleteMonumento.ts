/*DELETE /api/monumentos/:id: Borra un contacto por su id (1 punto).
En caso de no existir el monumento con id indicado, devolverá un error 404 */

import { Request, Response } from "npm:express@4.18.2";
import { MonumentoModel } from "../db/monumentos.ts";

//DELETE
const deleteMonumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monumento = await MonumentoModel.findOneAndDelete({ _id: id }).exec();
    if (!monumento) {
      res.status(404).send("Monument not found");
      return;
    }
    res.status(200).send("Monument deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMonumento;