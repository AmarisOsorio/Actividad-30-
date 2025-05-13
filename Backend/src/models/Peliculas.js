/*
   Campos: 
     titulo
     descripcion
     director
     genero
     anio
     duracion
     imagen
*/

import { Schema , model } from "mongoose";

const peliculaSchema = new Schema({
    titulo: {
      type: String,
      require: true
    },
    descripcion: {
      type: String,
      require: true
    }, 
    director: {
        type: String,
        require: true
    }, 
    genero: {
        type: String,
        maxLength: 100
    },
    anio: {
        type: Number,
        require: true,
    },
    duracion: {
        type: Number,
        require: true
    },
    imagen: {
        type: String
    }
},{
    timestamps: true,
    strict: true
}); 

export default model("Peliculas", peliculaSchema);