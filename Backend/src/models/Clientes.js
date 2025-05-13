/*
   Campos: 
     nombre
     correo
     contrasenia
     telefono
     direccion
     activo
*/

import { Schema , model } from "mongoose";

const clientesSchema = new Schema({
    nombre: {
      type: String,
      require: true,
      maxLength: 100
    },
    correo: {
      type: String,
      require: true,
      maxLength: 100
    }, 
    contrasenia: {
        type: String,
        require: true
      }, 
    telefono: {
        type: String,
        maxLength: 100
      },
    direccion: {
        type: String,
        require: true,
      },
    activo: {
        type: Boolean,
        require: true
      }
},{
    timestamps: true,
    strict: true
}); 

export default model("Clientes", clientesSchema);