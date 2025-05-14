import express from "express";
import recuperacionContraController from "../controllers/recuperacionContraController.js";

const router = express.Router();

router.route("/requestCode").post(recuperacionContraController.requestCode);
router.route("/verifyCode").post(recuperacionContraController.verifyCode);
router.route("/newPassword").post(recuperacionContraController.newPassword);

export default router;