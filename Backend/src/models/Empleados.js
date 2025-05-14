/*
   Campos: 
     nombre
     correo
     contrasenia
     telefono
     direccion
     puesto
     fecha_contratacion
     salario
     activo
*/

import { Schema , model } from "mongoose";

const EmpleadosSchema = new Schema({
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
    puesto: {
        type: String,
        require: true,
      },
    fecha_contratacion: {
        type: Date,
        require: true,
      },
    salario: {
        type: Number,
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

export default model("Empleados", EmpleadosSchema);