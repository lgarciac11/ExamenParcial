/*POST /api/monumentos: Crea un nuevo monumento (2 puntos).
Si ya existe ese nombre, en el mismo código postal, en la DDBB devolverá un error 400.
Si falta alguno de los datos o algún dato es erróneo devolverá un error 500 */
/*Nombre, por ejemplo “Torre Eiffel”.
Descripción.
Código postal, por ejemplo “75007”
Código ISO del País en el que se encuentra */

//@ts-ignore
import { Request, Response } from "npm:express@4.18.2";
import {MonumentoModel} from "../db/monumentos.ts";
import { Location, Weather, Region, Monumento } from "../types.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

//Para obetener la ubicación
export const getLocation = async (
    codPostal: string,
    ISO: string
  ): Promise<Location> => {
    const BASE_URL = "https://zip-api.eu/api/v1";
    const url = `${BASE_URL}/info/${ISO}-${codPostal}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Cannot fetch location");
    }
  
    const data = await response.json();
  
    return {
      pais: ISO,
      ciudad: data.state,
    };
  };

  //Para obetener el continente
export const getRegion = async (
    ISO: string
  ): Promise<Region> => {
    const BASE_URL = "https://restcountries.com/v3.1/alpha";
    const url = `${BASE_URL}/${ISO}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Cannot fetch region");
    }
  
    const data = await response.json();
  
    return {
      region: data.region,
    };
  };
//Para obtener el clima
export const getWeather = async (location: Location): Promise<Weather> => {
    const BASE_URL = "http://api.weatherapi.com/v1";
    const WEATHERAPI_API_KEY =
      env["WEATHERAPI_API_KEY"] || Deno.env.get("WEATHERAPI_API_KEY");
    if (!WEATHERAPI_API_KEY) {
      throw new Error("WEATHERAPI_API_KEY is not defined");
    }
  
    const url = `${BASE_URL}/current.json?key=${WEATHERAPI_API_KEY}&q=${location.ciudad}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Cannot fetch weather");
    }
    const data = await response.json();
    return {
      temperatura: data.current.temp_c,
      desMet: data.current.condition.text,
    };
  };

//Para obtener el tiempo(hora)
/*export const getTime = async (
  continente: Region
  ): Promise<Time> => {
    const BASE_URL = "http://worldtimeapi.org/api/timezone";
    const url = `${BASE_URL}/${continente.region}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Cannot fetch time");
    }
  
    const data = await response.json();
    return {
      datetime: data.current.datetime,
    };
  };*/


//POST 
const addMonumento = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, codPostal, ISO } = req.body;
    if (!nombre || !descripcion || !codPostal || !ISO) {
      res.status(500).send("Nombre, descripción código postal y código ISO son obligatorios"); //por si no están todos los campos
      return;
    }

if(typeof nombre !== "string" || typeof descripcion !== "string" || typeof codPostal !== "string" ||  typeof ISO !== "string"){
  res.status(500).send("Tipo de dato invalido");
  return;
}

  if (ISO.length !== 2) {
    res.status(400).send("ISO must be 2 characters");
    return;
  }

const alreadyExists = await MonumentoModel.findOne({ nombre, codPostal }).exec();
if (alreadyExists) {
  res.status(400).send("Monument already exists");
  return;
}
  const location = await getLocation(codPostal, ISO);
  console.log(location);
  const weather = await getWeather(location);
  console.log(weather);
  const region = await getRegion(ISO);
  console.log(region);
  //const time = await getTime(region);

  const newMonumento = new MonumentoModel({ nombre, descripcion, codPostal, ISO, location, region, weather });
  await newMonumento.save();

  res.status(200).send({
    nombre: newMonumento.nombre,
    descripcion: newMonumento.descripcion,
    codPostal: newMonumento.codPostal,
    location: newMonumento.ubicacion,
    region: newMonumento.continente,
    //time: newMonumento.hora,
    tiempo: newMonumento.tiempoMet,
    id: newMonumento._id.toString(), //necesario, porque el id es de tipo object
  });
}catch (error) {
  res.status(500).send(error.message);
  return;
}
};

export default addMonumento;
