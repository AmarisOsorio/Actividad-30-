import clientesModel from "../models/Clientes.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import nodemailer from "nodemailer"; //Enviar Correo
import crypto from "crypto"; //genera código aleatorio
import {config} from "../config.js"

const registroControllers = {};

registroControllers.registro = async (req,res) => {
    const{  nombre , correo , contrasenia , telefono , direccion , activo } = req.body;

    try {
        //verificamos si el cliente existe
        const existeCliente = await clientesModel.findOne({correo})
        if(existeCliente){
            return res.json({message: "Este cliente ya existe"})
        }

        //encriptar la contraseña del cliente
        const passwordHash = await bcryptjs.hash( contrasenia , 10 )

        //Guardo al cliente
        const newCliente = new clientesModel({  nombre , correo , contrasenia:passwordHash , telefono , direccion , activo: activo || false })
        newCliente.save();

        //generamos un código aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex") //esto nos permite un código hexadecimal con letras y numeros

        //Crear el token
        const tokenCode = jsonwebtoken.sign(
            //1. Que vamos a guardar?
            {correo , verificationCode},

            //2. Palabra secreta
            config.JWT.secret,

            //3.Cuando expira
            {expiresIn: "2h"},
        ) 

        res.cookie("VerificationToken" , tokenCode , {maxAge: 2*60*60*1000})

        //enviar el correo electronico
        //1. Transporter => es quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail", auth: {user: config.email.email_user, pass: config.email.email_pass}
        })

        //2. mailOption = Quien lo recibe
        const mailOption = {
            //1) Quien lo envia
            from: config.email.email_user,
            //2) QUien lo recibe
            to: correo, //esta es la variable es con la que se esta registrando el cliente
            //Asunto
            subject: "Verificación de Correo",
            //cuerpo del correo
            text: `Para verificar tu correo, utiliza el siguiente código ${verificationCode}\n 
            El código vence en dos horas`
        }  

        //3. Enviar correo
        transporter.sendMail(mailOption, (error,info) =>{
            if(error) return res.json({message: "Error"})
            console.log ("Correo enviado")
        })

        res.json({message: "Registro de cliente satisfactorio! VVerifica el código en tu correo"})

    } catch (error) {
        res.json({message: "ERROR" + error})
    }
};

//Verificar el código

registroControllers.verifyCodeEmail = async ( req , res ) => {
    const {verificationCode} = req.body;
    const token = req.cookies.VerificationToken;

    try {
        //Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token , config.JWT.secret)
        const {correo , verificationCode: storedCode} = decoded;

        //Comparar el código que enviamos al correo con el que el usuario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Código invalido"})
        }

        //Cambiamos el estado de "isVErified" a true
        const cliente = await clientesModel.findOne({correo});
        cliente.activo = true;
        await cliente.save();

        res.json({message: "Correo verificado satisfactoriamente!"})

        //Quito la cookie con el token
        res.clearCookie("VerificationToken")
    } catch (error) {
        res.json({message: "ERROR" + error});
    }
}

export default registroControllers;