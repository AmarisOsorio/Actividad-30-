import express from "express";
import empleadosController from "../controllers/empleadosController.js";

const router = express.Router();

router.route("/")
.get(empleadosController.getEmployees)

router.route("/:id")
.put(empleadosController.updateEmployees)
.delete(empleadosController.deleteEmployees);

export default router;