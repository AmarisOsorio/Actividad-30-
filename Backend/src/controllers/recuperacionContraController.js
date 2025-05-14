import jsonwebtoken, { decode } from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientesModel from "../models/Clientes.js"
import empleadosModel from "../models/Empleados.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";
import { verify } from "crypto";

// 1- Crear un array de funciones
const recuperacionContraController = {};

recuperacionContraController.requestCode = async (req, res) => {
  const { correo } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await clientesModel.findOne({ correo });
    if (userFound) {
      userType = "Cliente";
    } else {
      userFound = await empleadosModel.findOne({ correo });
      userType = "Empleado";
    }

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Generar un código de 5 digitos
    const code = Math.floor(10000 + Math.random() * 60000).toString();

    // generar un token
    const token = jsonwebtoken.sign(
      //1-¿qué voy a guardar?
      { correo, code, userType, verfied: false },
      //2- secret key
      config.JWT.secret,
      //3- ¿Cúando expira?
      { expiresIn: "25m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 25 * 60 * 1000 });

    // Enviamos el correo
    await sendEmail(
      correo,
      "Password recovery Code",
      `your verification code is ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Verification code send" });
  } catch (error) {
    console.log("error" + error);
  }
};

/******************************* VERIFICAR EL CÓDIGO QUE ME ENVIARON POR EL CORREO************************************* */

recuperacionContraController.verifyCode = async (req, res) => {  
    const { code } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({ message: "Invalid Code" });
        }

        const newToken = jsonwebtoken.sign(
            { correo: decoded.correo, code: decoded.code, userType: decoded.userType, verify: true },
            config.JWT.secret,
            { expiresIn: "25m" }
        );

        res.cookie("tokenRecoveryCode", newToken, { maxAge: 25 * 60 * 1000 });
        res.json({ message: "Code verified successfully" });
    } catch (error) {
        console.error("Error en verifyCode: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


recuperacionContraController.newPassword = async (req,res) => {
  const {newPassword} = req.body;

  try {
    //Acceder al token que está en las cookies
    const token = req.cookies.tokenRecoveryCode

    //Decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)

    //Ver si el código ya fue verificado
    if(!decoded.verify){
      return res.json({message: "Code not verified"})
    }

    let user;

    //Encriptar la contraseña
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    //Guardamos la nueva contraseña en la base de datos
    if(decoded.userType === "client"){
      user = await clientesModel.findOneAndUpdate({correo},{contrasenia:hashedPassword},{new:true})
    }else if(decoded.userType === "employee"){
      user = await empleadosModel.findOneAndUpdate({correo},{contrasenia:hashedPassword},{new:true})
    }

    res.clearCookie("tokenRecoveryCode")
    res.json({message: "Su contraseña se ha actualizado!"})
  } catch (error) {
    console.log("error" + error)
  }
}
export default recuperacionContraController;