import mongoose from "npm:mongoose@7.6.3";
import { Monumento } from "../types.ts";
//Para crear el modelo persona, necesario para los resolvers

const Schema = mongoose.Schema;

const monumentoSchema = new Schema(
  {
    nombre: { type: String, required: true},
    codPostal: { type: String, required: true },
    ISO: { type: String, required: true },
    ciudad: { type: String, required: false },
    pais: { type: String, required: false },
    continente: { type: String, required: false },
    descripcion: { type: String, required: true },
    //hora: { type: String, required: false },
    tiempoMet: { type: String, required: false },
  }
);
//El timestamps: true las organiza por tiempo de creación

export type MonumentoModelType = mongoose.Document & Omit<Monumento, "id">;

export const MonumentoModel = mongoose.model<MonumentoModelType>("Monumento", monumentoSchema);

/* nombre: string;
    codPostal: string;
    ISO: string;
    ciudad: string;
    pais: string;
    continente: string;
    descripcion: string;
    hora: number;
    tiempoMet: string;
    id: string; */