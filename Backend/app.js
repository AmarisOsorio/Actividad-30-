import express from "express";
import cookieParser from "cookie-parser";
import clientesRoute from "./src/routes/clientes.js"
import registroclientesRoute from "./src/routes/registroClientes.js"


const app = express();

app.use(express.json()); 
app.use(cookieParser());

/****************** R U T A S **********************/

app.use("/api/clientes" , clientesRoute)

//Login
app.use("/api/registroClientes" , registroclientesRoute)



export default app;