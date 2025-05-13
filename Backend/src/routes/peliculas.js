import express from "express";
import multer from "multer";
import peliculasController from "../controllers/peliculasController.js";

const router = express.Router();

//Configurar una carpeta en local que guarde las imagenes
const upload = multer({dest: "public/"})

router.route("/")
.get(peliculasController.getAllPosts)
.post(upload.single("imagen"), peliculasController.createPost);

export default router;