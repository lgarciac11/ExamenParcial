export type Location = {
    pais: string;
    ciudad: string;
  };

export type Weather = {
    desMet: string;
    temperatura: number;
};
/*export type Time = {
    datetime: string;
}*/
export type Region = {
    region: string;
}

export type Monumento = {
    nombre: string;
    codPostal: string;
    ISO: string;
    ubicacion?: Location;
    continente?: Region;
    //hora: Time;
    tiempoMet?: Weather;
    descripcion: string;
    id: string;
  };

  /*id (_id de MongoDB)
Nombre
Descripción
Código Postal
Ciudad dónde se encuentra
País donde se encuentra
Continente donde se encuentra.
Hora actual en el lugar donde se encuentra.
Condiciones metereológicas del lugar donde se encuentra.*/