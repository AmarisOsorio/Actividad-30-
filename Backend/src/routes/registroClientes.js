import express  from "express";
import registroControllers from "../controllers/registroClientesController.js";

const router = express.Router();

router.route("/").post(registroControllers.registro);
router.route("/verifyCodeEmail").post(registroControllers.verifyCodeEmail); 
export default router;