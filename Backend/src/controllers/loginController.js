import clientesModels from "../models/Clientes.js";
import empleadosModels from "../models/Empleados.js";
import bcrypt from "bcryptjs";
import jsonwebtokenerror from "jsonwebtoken";
import  {config} from "../config.js";


const loginController ={}

loginController.login = async (req,res) => {
    const { correo , contrasenia } = req.body;

    try{

        /**
         * Validamos los 3 posibles niveles
         * 1. Admin
         * 2. Empleado
         * 3. Cliente
         */

        let userFound; 
        let userType; 

        /**
         * 1. Admin
         * Verifiquemos si esta ingresando es Admin
         */
        if(correo === config.emailAdmin.email && contrasenia === config.emailAdmin.password){
            userType = "Admin";
            userFound = {_id : "Admin"};
        }else{
            /*2. Empleados*/
            userFound = await EmployeesModel.findOne({correo});
            userType = "Empleado"

            /*3. Clientes*/
            if(!userFound){
                userFound = await ClientsModel.findOne({correo});
                userType = "Cliente"
            }
        }

        /*Si no encontramo un usuario */
        if(!userFound){
            return res.json({message: "Usuario no encontrado"});
        }

        /*Si no es administrador, validadmos la contraseña */

        if(!userType !== "Admin"){
            const isMatch = bcrypt.compare(contrasenia , userFound.contrasenia);
            if(!isMatch){
                return res.json({message: "Contraseña invalida"});
            } 
            
        }

        /*Generar el token */
        jsonwebtokenerror.sign(
            {id: userFound._id , userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error , token) => {
                if(error) console.log(error);

                res.cookie("authToken",token)
                res.json({message: "¡Inicio de sesión satisfactorio!"})
                
            }
        )
        

    }
    catch(error){
        console.log(error)
    }
}

 export default loginController;