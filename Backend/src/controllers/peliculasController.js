import peliculasModel from "../models/Peliculas.js"
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";


//1. Configurar cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

//2. Array de funciones vacío
const peliculasController = {}

// Obtenemos todos los posts del blog
peliculasController.getAllPosts = async (req,res)=> {

    const posts = await peliculasModel.find();
    res.json(posts);

}

// Subir un post al blog
peliculasController.createPost = async (req, res) => {

    try {
        const {titulo , descripcion , director , genero , anio , duracion}=req.body;
        let imageUrl = ""

        //subir la imagen a cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: [ "jpg" , "png" , "jpeg" ]
                }
            );

            imageUrl = result.secure_url
        }

        //Guardar la url
        const newPelicula = new peliculasModel({titulo , descripcion , director , genero , anio , duracion , imagen: imageUrl})
        newPelicula.save()

        res.json({message: "post saved"})

    } catch (error) {
        console.log("error" + error)
    }

}

export default peliculasController;