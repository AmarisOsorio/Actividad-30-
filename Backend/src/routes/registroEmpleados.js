import express from "express";
import registroEmpleadosControllers from "../controllers/registroEmpleadosController.js";

const router = express.Router();

router.route("/")
.post(registroEmpleadosControllers.registroEmp)

export default router;
