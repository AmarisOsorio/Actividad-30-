import Empleados from "../models/Empleados.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import {config} from "../config.js"


const registroEmpleadoController = {};

registroEmpleadoController.registroEmp = async (req,res) => {
    const {nombre , correo , contrasenia , telefono , direccion , puesto , fecha_contratacion , salario , activo} = req.body;

    try{
        //verificamos si el empleado ya existe
        const existEmployee = await Empleados.findOne({correo});
        if(existEmployee){
            return res.json({message: "Este registro de empleado ya existe"})
        }   

        //Hashear o encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contrasenia , 10);

        //Guardar el empleadp
        const newEmployee = new Empleados({nombre , correo , contrasenia: passwordHash , telefono , direccion , puesto , fecha_contratacion , salario , activo});
        await newEmployee.save();

        //Generar un token que valide que ya estoy registrado 
        //y poder acceder a todas las paginas
        jsonwebtoken.sign(
            //1
            {id: newEmployee._id},
        
            //2
            config.JWT.secret,

            //3
            {expiresIn: config.JWT.expiresIn},

            //4
            (error, token) => {
                if(error) console.log(error);
                res.cookie("authToken", token)
                res.json({message: "Empleado Registrado"})
            }

        )
    }
    catch(error){
        console.log(error)
        res.json({message: "Error al registrar empleado"})
    }
}

export default registroEmpleadoController;